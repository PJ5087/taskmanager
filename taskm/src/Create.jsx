import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Create() {
    const[values,setValues]=useState({
        title:'',
        description:''
        
    })
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/users',values)
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .catch(err=>console.log(err))
    }
  return (
    <div className='d-flex w-100 vh-100 jsutify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
            <h1>Add Description</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='name'>Title :</label>
                    <input type='text' name='name' className='form-control' placeholder='Enter Title' onChange={e=>setValues({...values,title:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='description'>Description:</label>
                    <input type='text' name='description' className='form-control' placeholder='Enter Description' onChange={e=>setValues({...values,description:e.target.value})}/>
                </div>
                
                <button className='btn btn-success'>Submit</button>
                <Link to='/' className='btn btn-primary ms-3'>Back</Link>
            </form>
        </div>
         
    </div>
  )
}

export default Create