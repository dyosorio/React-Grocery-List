import React, { useState, useEffect } from 'react'
import './App.css';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App() {
  //step 1: set up states
  const [name, setName] = useState(''); 
  const [list, setList] = useState(getLocalStorage());  
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ 
    show:false, 
    msg:'', 
    type:'' });

  const handleSubmit = (e) => {
    e.preventDefault();
    //step 4: deal with alert, edit and add new item
    if(!name){
      //display alert
      showAlert(true, 'danger', 'please enter value')
    } else if(name && isEditing){ 
      //deal with edit
      setList(list.map((item ) => {
        if(item.id ===  editID){
          return {...item, title: name}
        }
        return item;
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'item changed')
    } else {
      //show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = { 
        id: new Date().getTime().toString(), 
        title: name 
      }
      setList([...list, newItem]);
      setName('');
      console.log(name)
    }
  }
  //step 5: manage alerts 
  const showAlert = (show=false, type='', msg='') => {
    setAlert({ show, type, msg })
  }
  //step 6: clear list function
  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }
  //step 7: remove individual items
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    //return item whose id don't match the passed id
    setList(list.filter((item) => item.id !== id))
  }
  //step 8: edit item function
  const editItem = (id) => {
    //return item whose id matches the passed id
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title)
  }

  //final step: local storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className='section-center'>
      {/*step 2: add form and button*/}
      <div className='form-control'>
        <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery List 🛒</h3>
        <div className='form-control'>
          <input
          type='text'
          className='grocery-form'
          onSubmit={handleSubmit}
          placeholder='e.g. milk'
          value={name} 
          onChange={(e) => setName(e.target.value)}
          />

          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      </div>
      {list.length > 0 && (
        <div className='grocery-container'> 
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
