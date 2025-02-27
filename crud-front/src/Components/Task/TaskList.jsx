import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { fetchTasks, addTask, updateTask, deleteTask } from "../../redux/taskActions";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.taskReducer || {});
  const { user } = useSelector((state) => state.authReducer);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      dispatch(fetchTasks(userId));
    }
  }, [dispatch]);

  const handleAddOrUpdateTask = () => {
    if (!title.trim() || !description.trim()) return;

    const taskData = { userId: user?.id, title, description, status };

    if (editingTaskId) {
      dispatch(updateTask(editingTaskId, taskData));
    } else {
      dispatch(addTask(taskData));
    }

    setTitle("");
    setDescription("");
    setStatus("pending");
    setEditingTaskId(null);
    setIsOpen(false);
  };

  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId));
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setEditingTaskId(task.id);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black-700 " style={{ padding: '5px', margin: '10px' }}>Daily Tasks</h1>
          <button
            style={{ padding: '10px', margin: '10px' }}
            onClick={() => {
              setIsOpen(true);
              setEditingTaskId(null);
              setTitle("");
              setDescription("");
              setStatus("pending");
            }}
            className="bg-stone-600 text-white text-bold cursor-pointer rounded-md flex items-center gap-2 hover:bg-stone-300 transition"
          >
            <PlusCircleIcon className="h-6 w-6" />
            Add Task
          </button>
        </div>

        {loading && <p className="text-center text-gray-500">Loading tasks...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        <div className="p-6">
          {tasks && tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks added yet.</p>
          ) : (
            <div style={{ margin: '20px' }}>
              <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
                <thead className="bg-stone-400 text-black">
                  <tr>
                    <th className="text-left text-black-600 font-semibold" style={{ padding: '10px' }}>Title</th>
                    <th className="text-left text-black-600 font-semibold">Description</th>
                    <th className="text-center text-black-600 font-semibold">Status</th>
                    <th className="text-center text-black-600 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-t hover:bg-gray-50 transition">
                      <td style={{ padding: '10px' }}>{task.title}</td>
                      <td >{task.description}</td>
                      <td className=" text-center">{task.status}</td>
                      <td className=" flex justify-center space-x-2">
                        <button
                          style={{ margin: '5px', padding: '5px' }}
                          className="bg-stone-600 text-white rounded-md hover:bg-stone-300 transition cursor-pointer"
                          onClick={() => handleEdit(task)}
                        >
                          <PencilIcon className="h-6 w-6" />
                        </button>
                        <button
                          style={{ margin: '5px', padding: '5px' }}
                          className="bg-rose-600 text-white rounded-md hover:bg-rose-300 transition cursor-pointer"
                          onClick={() => handleDelete(task.id)}
                        >
                          <TrashIcon className="h-6 w-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add/Edit Task */}
        {isOpen && (
          <div className="fixed inset-0 bg-stone-600 bg-opacity-10 flex items-center justify-center">
            <div className="bg-stone-100 p-6 rounded-lg shadow-lg w-96" style={{ padding: '20px', margin: '5px' }}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold" style={{ margin: '5px' }}>
                  {editingTaskId ? "Edit Task" : "Add Task"}
                </h2>
                <XMarkIcon
                  className="h-5 w-5 cursor-pointer bg-black text-white rounded-full"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <input
                style={{ marginBottom: '10px', padding: '5px' }}
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                style={{ marginBottom: '10px', padding: '5px' }}
                placeholder="Description"
                className="w-full p-2 border rounded mb-3"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <select
                style={{ marginBottom: '10px', padding: '5px' }}
                className="w-full p-2 border rounded mb-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="inProgress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <button
                style={{ marginBottom: '10px', padding: '5px' }}
                className="bg-black text-white rounded w-full hover:bg-pink-600 transition"
                onClick={handleAddOrUpdateTask}
              >
                {editingTaskId ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
