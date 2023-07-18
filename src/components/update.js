import axios from 'axios';
import './home.css'
import './update.css'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'



function Update() {


    const history = useNavigate()

    const { id } = useParams();
    const [values, setValue] = useState({
        id: id,
        Name: '',
        contact: "",
        image: "",
        category: "",
        joining: ''
    })
        

  

    useEffect(() => {
        axios.get('http://localhost:3000/getUser/' + id)
            .then((res) => {

                setValue({...values, Name: res.data.Name, contact: res.data.contact , image: res.data.image, category: res.data.category,  joining: res.data.joining  })

            })
            .catch((err) => console.log(err))

    },[])


const handelUpdate = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/users/${id}`, values)
        .then((res) => {
        
            history('/')    
            window.location.reload();   


        })  
        .catch((er) => console.log(er))



}


return (
  
    
    <div>
        <div className='div'>

        </div>
         <h2>Update</h2>
        <div className='main' style={{ marginTop: '10px' }}>
            <div className='container-main' st>
                <form onSubmit={handelUpdate} >

                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder='Enter your Name'
                            value={values.Name}
                            onChange={e=>setValue({...values,Name:e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Contact:</label>
                        <input
                            type="text"
                            name="contact"
                            placeholder='Enter your Contact'
                            value={values.contact}
                            onChange={e=>setValue({...values,contact:e.target.value})}
                        />
                    </div>

                    <div>
                        <label>image:</label>
                        <input
                            type="text"
                            name="image"
                            placeholder='Enter your image'
                            value={values.image}
                            onChange={e=>setValue({...values,image:e.target.value})}
                        />
                    </div>

                    <div>
                        <label>category:</label>
                        <h5>{values.category}</h5>
                        <select value={values.category}  onChange={e=>setValue({...values,category:e.target.value})} >
                            <option>Experience</option>
                            <option>Fresher</option>
                        </select>

                    </div>


                    <div>
                        <label>Joining:</label>
                        <input

                            type="date"
                            name="joining"
                            value={values.joining}
                            onChange={e=>setValue({...values,joining:e.target.value})}
                        />
                    </div>

                    <div className='btn'>
                        <button type="submit">Save Data</button>
                    </div>
                </form>
            </div>
        </div>
    
    </div>

    
    
    )
    
    
}

export default Update
