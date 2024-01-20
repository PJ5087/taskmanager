
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


function Home() {
    const[data,setData]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:3000/users')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
   
    const handleComplete = (id) => {
        axios.patch(`http://localhost:3000/users/${id}`, { completed: true })
          .then(() => {
            setData(prevData => prevData.map(task => (task.id === id ? { ...task, completed: true } : task)));
          })
          .catch(err => console.log(err));
      };

    const handleDelete=(id)=>{
        const confirm = window.confirm("would you like to delete?")
        if(confirm){
            axios.delete('http://localhost:3000/users/'+id)
            .then(res=>{
               location.reload()
            })
            .catch(err=>console.log(err))
        }
      }
  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
        <h1>Task Manager</h1>
        <div className='w-75 rounded bg-white border shadow p-4'>
            <div className='d-flex justify-content-end'>
                <Link to="/create" className='btn btn-success'>Add +</Link>
            </div>
            <table className='table  table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d,i)=>(
                            <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.title}</td>
                                <td>{d.description}</td>
                                {/* <td>{d.status}</td> */}
                                <td>
                                    
                                      {!d.completed ? (
                                                    <>
                                                          <button onClick={() => handleComplete(d.id)} className='btn btn-sm btn-success'>Complete</button>
                                                         
                                                    </>
                                                  ) : (
                                                 <span className='text-success'>Completed</span>
                                                          )}  
                                    
                                </td>
                                <td>
                                    <Link to={`/read/${d.id}`} className='btn btn-sm btn-info'>Read</Link>
                                    <Link to={`/update/${d.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                    <button onClick={e=>handleDelete(d.id)} className='btn btn0sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
  
}

export default Home