import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Update() {
    //const[data,setData]=useState([])
    const {id}=useParams()
    const navigate=useNavigate()
    const[values,setValues]=useState({
        name:'',
        email:'',
        phone:''
    })

    useEffect(()=>{
        axios.get('http://localhost:3000/users/'+id)
        .then(res=>{
            setValues(res.data)
        })
        .catch(err=>console.log(err))
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.put('http://localhost:3000/users/'+id,values)
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .catch(err=>console.log(err))
    }
  return (
    <div className='d-flex w-100 vh-100 jsutify-content-center align-items-center bg-light'>
     <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Update user</h1>
        <form onSubmit={handleSubmit}>
            <div className='mb-2'>
                <label htmlFor='title'>Title :</label>
                <input type='text' name='title' className='form-control' placeholder='Enter Name' value={values.title} onChange={e=>setValues({...values,title:e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor='description'>Description:</label>
                <input type='text' name='description' className='form-control' placeholder='Enter Description' value={values.description} onChange={e=>setValues({...values,description:e.target.value})}/>
            </div>
            <button className='btn btn-success'>Update</button>
            <Link to='/' className='btn btn-primary ms-3'>Back</Link>
        </form>
     </div>
     
   </div>
  )
}

export default Update