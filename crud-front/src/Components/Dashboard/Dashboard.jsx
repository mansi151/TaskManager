import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/taskActions";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const name = localStorage.getItem("name")
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {tasks} = useSelector((state)=> state.taskReducer || {});
    useEffect(()=> {
        const userId = localStorage.getItem("id");
        if(userId){
            dispatch(fetchTasks(userId))
        }
    },[dispatch])
    return (
        <>
            <h1 className="font-bold" style={{margin:'10px',padding:'10px'}}>Hello ! {name}</h1>
            <div className="max-w-sm  bg-stone-100 border border-gray-200 rounded-lg shadow-sm cursor-pointer" style={{ margin: '20px', padding: '12px' }} onClick={() => navigate("/task")} >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Total Task Count : {tasks && tasks.length || 0}</h5>
                <p className="mb-3 font-normal text-gray-700 text-red-600 text-center">Pending Task : {tasks && tasks.length && tasks.filter((val, ind) => val.status === 'pending').length || 0}</p>
                <p className="mb-3 font-normal text-gray-700 text-yellow-600 text-center">In Progress Task : {tasks && tasks.length && tasks.filter((val, ind) => val.status === 'inProgress').length || 0}</p>
                <p className="mb-3 font-normal text-gray-700 text-green-600 text-center">Completed Task : {tasks && tasks.length && tasks.filter((val, ind) => val.status === 'completed').length || 0}</p>
            </div>

        </>
    )
}

export default Dashboard;