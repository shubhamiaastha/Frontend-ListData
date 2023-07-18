import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import './home.css'
// import { useNavigate, Link } from "react-router-dom"



function Home() {

        const [formData, setFormData] = useState({
          Name: '',
          contact: '',
          image: '',
          category: '',
          joining:" ",
      
        });

        const history = useNavigate();


        


        const handleChange = (e) => {
       
            setFormData({ ...formData, [e.target.name]: e.target.value});
          };

         
        


          const handleSubmit = (e) => {
            e.preventDefault();
           

            if (formData.Name.length === 0) {
                alert('Invalid Form, Username can not be empty')
                return
              }

        
            axios.post('http://localhost:3000/user', formData)
              .then((response) => {
                console.log('Data saved successfully:', response.data);
                alert('Data saved successfully:', response.data);
                history('/')
                window.location.reload();
                

            
              })
              .catch((error) => {
                console.error('Error saving data:', error);
                
              });
        
            setFormData({ Name: '', contact: '',image:"", category:"" , joining:" " });
          };



    return (
        <>
          
        <h2>Save Data Form</h2>
        <div className='main'>
        <div className='container'>
     
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            placeholder='Enter your Name'
            value={formData.Name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            placeholder='Enter your Contact'
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>image:</label>
          <input
            type="text"
            name="image"
            placeholder='Enter your image'
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>category:</label>
          <input
            type="text"
            name="category"
            placeholder='Enter your Category'
            value={formData.category}
            onChange={handleChange}
          />
        </div>


        <div>
          <label>Joining:</label>
          <input
            type="date"
            name="joining"
            value={formData.joining}
            onChange={handleChange}
          />
        </div>

        



        <div className='btn'>
          <button type="submit">Save Data</button>
        </div>
      </form>
    </div>
    </div>

    </>
        
    )
}

export default Home;
