import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';


function DeleteUser() {
  const history = useNavigate()

  const { id } = useParams();

 
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then((response) => {

        alert('User deleted successfully')
        history('/')
        window.location.reload();

      }).catch((err) => {
        if (err.response.status === 403) {

          alert("Can't delete Experience user")
          history('/')
          
       
          window.location.reload();

        }


      }) 
}

export default DeleteUser

