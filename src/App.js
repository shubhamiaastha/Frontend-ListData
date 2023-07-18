import React, { useState, useEffect } from 'react'
import Home from "./components/home"
import Update from './components/update';
import DeleteUser from './components/DeleteUser';
import axios from 'axios'
import './App.css';
import {Routes, Route, useNavigate} from "react-router-dom";
import Moment from 'react-moment';

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

function App() {

  const [data, setData] = useState([])
 
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [category, setCategory] = useState('')

  // fetchApi......................

  useEffect(() => {

    const fetcData = async () => {
      try {

        const response = await axios.get('http://localhost:3000/getUser')
        setData(response.data);
        setName(response.data[0].Name)
        setContact(response.data[0].contact)
        setCategory(response.data[0].category)
        console.log(data)

      } catch (e) {
        console.log(e)
      }
    }
    fetcData()

  }, [])

  // Sorting list by name.....................

  const [sortAccending, setsortAccending] = useState('asc');
  const [sortDecending, setsortDecending] = useState('desc');

  const sortAcc = () => {
    

    const sortedItems = [...data].sort((a, b) => {
      if (a.Name < b.Name) {
        return sortAccending === 'asc' ? -1 : 1;
      }
      return 0;
    });
    setData(sortedItems);
  };
  const sorDesc = () => {
    const sortedItems = [...data].sort((a, b) => {
      if (a.Name > b.Name) {
        return sortDecending === 'desc' ? -1 : 1;
      }

      return 0;
    });

    setData(sortedItems);
  };

  //user can swipe right side and delete data.....................

  const leadingActions = (data) => (
    <LeadingActions>
      <SwipeAction onClick={() => {
        window.alert(" Are you sure you update details!")
        history(`/update/${data._id}`)
      }}>
        <div className='action-container'>
          <span className='del-span' >Update</span>
          <div className='action'>
            Action name
          </div>
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (data) => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {

          history(`/delete/${data._id}`)
        }}

      >
        <div className='del-container'>
          <span className='del-span' >🗑</span>
          <div className='delete'>
            Delete
          </div>
        </div>
      </SwipeAction>
    </TrailingActions>
  );


  const history = useNavigate();

  const handleAddEmployee = () => {
    history('/home')

  };

  return (

    <>
      <Routes>
        <Route exact path='/' element={


          <div className='contanier'>

            <div className='header'>
              <p>Experience</p>
              <p>{data.length} Iteam(s)</p>

              <div className='icon'>

                <button onClick={sortAcc} type='submit'>{sortAccending === 'asc' ? <span>&#x25B2;</span> : <span>Up</span>}</button>
                <button onClick={sorDesc} type='submit'>{sortDecending === 'desc' ? <span>&#x25BC;</span> : <span>Down</span>}</button>

              </div>
              <div className='Add-con'>
                <button type='submit' className='' onClick={handleAddEmployee} >Add</button>
              </div>

            </div>

            <ul className='list'>
              {
                data.map((user, i) =>
                (
                  <div className='card'>


                    <SwipeableList>
                      <SwipeableListItem leadingActions={leadingActions(user)}
                        trailingActions={trailingActions(user)}>
                        <li className='listItem'><img src={user.image} alt='not found' /> </li>
                        <div style={{ padding: "20px" }} key={i} className='details'>
                          <h3 className='' >{user.Name}</h3>
                          <p className='' ><span style={{ marginRight: "3px" }}>+91</span>{user.contact}</p>
                        </div>
                        <div className='joining'>
                          <p className='join-date'><span style={{ color: 'black', fontWeight: "500" }} >Joining Date: </span><span style={{ color: "grey" }}>{<Moment format='DD MMMM YYYY'>{user.joining}</Moment>} </span></p>
                          <p className='join-date'><span style={{ color: 'black' }} >Join: </span>{<Moment fromNow>{user.joining}</Moment>}</p>
                        </div>
                      </SwipeableListItem>
                    </SwipeableList >
                  </div>

                )
                )
              }
            </ul>
          </div>
        } />

        <Route exact path="/home" element={<Home />} />
        <Route exact path='/update/:id' element={<Update />} />
        <Route exact path='/delete/:id' element={<DeleteUser />} />

      </Routes>

    </>
  );

}
export default App;