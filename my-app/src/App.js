import React, { useState, useEffect } from 'react'
import './App.css';
import List from './List';
import Alert from './Alert';

function App() {
  //step 1: set up states
  const [name, setName] = useState(''); //state for the form
  const [list, setList] = useState([]);  
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show:false, msg:'', type:'' });

  const handleSubmit = (e) => {
    e.preventDefault();
    //step 4: deal with alert, edit and 
    if(!name){
      //display alert
    } else if(name && isEditing){ 
      //deal with edit
    } else {
      //show alert
      const newItem = {
        id: new Date().getTime().toString(),
        title:name
      }; 
      setList([...list, newItem]);
      setName(''); 
    }
  }
 
  return (
    <section className='section-center'>
      {/*step 2: add form and button*/}
      <div className='form-container'>
        <form
        className='grocery-form'
        onSubmit={handleSubmit}
        placeholder='e.g. milk'
        //step 3: submit value onChange
        value={name} onChange={(e )=> setName(e.target.value)}
        >
        {alert.show && <Alert />}
        <h3>Grocery List</h3>
        <div className='form-control'>
          <input type='text'/>
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      </div>
      {list.length > 0 && (
        <div className='grocery-container'>
        Hello 🌎
          <List items={list} />
          <button className='clear-btn'>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
