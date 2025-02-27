import { useEffect, useState } from 'react'
import './ContactBook.css'
import axios from 'axios';
function ContactBook() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    isStar: 0,
    imageUrl: ''
  })
  const [editId, setEditId] = useState()
  const [fetchData, setFetchData] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  function handleChange(e) {
    console.log('enter here..??????')
    if (e.target.name === 'mobileNumber' && !/^\d+$/.test(e.target.value) && e.target.value !== '') {
      alert('Mobile must be integer');
      return;
    }
    if (e.target.name === 'imageUrl') {
      console.log('e..target,,', e.target.value)
      const file = e.target?.files[0]
      console.log('e..target..name', e.target.files[0])
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log("Base64: ", reader.result);
          setFormData({ ...formData, imageUrl: reader.result })
        }
        reader.onerror = (error) => {
          console.error("Error converting file:", error);
        };
      }
    } else {
      setFormData({ ...formData, [`${e.target.name}`]: e.target.value })
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formData.mobileNumber.length !== 10) {
        alert('Mobile number should be length of 10');
        return;
      }
      console.log('form..data', formData)
      const response = await axios.post('http://localhost:5000/contact', formData);
      console.log('response..', response.data)
      if (response.data) {
        await findData()
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          isStar: 0,
          imageUrl: ''
        })
      }
    }
    catch (e) {
      console.log('error', e)
    }
  }
  const findData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/contact/find');
      console.log(response.data);
      if (response.data.length > 0) {
        setFetchData(response.data)
      }
      else {
        setFetchData([]);
      }
    }
    catch (e) {
      console.log('Error while fetching data', e)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/contact/delete/${id}`);
      console.log(response.data)
      if (response.data) {
        await findData();
      }
    }
    catch (e) {
      console.log('Error in deleting..', e)
    }
  }

  const handleEdit = async (id) => {
    const findRecord = fetchData.find((val, ind) => val.id === id);
    setFormData(findRecord);
    setEditId(id);
    setIsEdit(true)
    console.log(findRecord);
  }

  const submitEdit = async () => {
    try {
      if (formData.mobileNumber.length !== 10) {
        alert('Mobile number should be length of 10');
        return;
      }
      const submitData = {
        id: editId,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        isStar: formData.isStar,
        firstName: formData.firstName,
        lastName: formData.lastName
      }
      const editData = await axios.post('http://localhost:5000/contact/edit', submitData);
      if (editData.data) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          isStar: 0
        })
        setEditId();
        setIsEdit(false);
        await findData()
      }
    } catch (e) {
      console.log('Error in updating data..', e.message)
    }
  }

  const handleFavorite = async (id, value) => {
    try {
      const data = {
        id,
        value: !value
      }
      const sendData = await axios.post('http://localhost:5000/contact/fav', data)
      if (sendData) {
        await findData();
      }
    }
    catch (e) {
      console.log('Error in marking favorite', e.message)
    }
  }

  useEffect(() => {
    findData()
  }, [])
  return (
    <>
      <div>
        <div className='mainDiv'>
          <form onSubmit={handleSubmit}>
            <input value={formData.firstName} name="firstName" onChange={handleChange} placeholder='First Name' className='input' />
            <input value={formData.lastName} name="lastName" onChange={handleChange} placeholder='Last Name' className='input' />
            <input value={formData.email} name="email" onChange={handleChange} placeholder='Email' className='input' />
            <input value={formData.mobileNumber} name="mobileNumber" onChange={handleChange} placeholder='Phone Number' className='input' />
            {/* <input name='imageUrl' type='file' onChange={handleChange} placeholder='Enter image' className='input' /> */}
            {!isEdit && <button type="submit" className='button'>Submit</button>}
          </form>
          {isEdit && <button onClick={submitEdit} className='button'>Save</button>}
        </div>
      </div>
      <div className='mainDiv'>
        <table border='1' className='table'>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>isFavorite</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fetchData.length > 0 && fetchData.map((contact, ind) => (
              <tr key={contact.id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>{contact.mobileNumber}</td>
                <td>{contact.isStar ? 'Yes' : 'No'}</td>
                <td>
                  <div>
                    <button onClick={() => handleEdit(contact.id)} className='editButton'>Edit</button>
                    <button onClick={() => handleDelete(contact.id)} className='deleteButton'>Delete</button>
                    <button className='starButton' onClick={() => handleFavorite(contact.id, contact.isStar)}><i className="material-icons star"> {contact.isStar ? 'star' : 'star_outline'}</i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
;
export default ContactBook
