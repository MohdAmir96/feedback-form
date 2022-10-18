import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './App.css';
import { fabClasses } from '@mui/material';

function App() {          

  // input states
  const [userName, setUserName] = React.useState('')
  const [userMessage, setUserMessage] = React.useState('')

  // response state
  const [messageList, setMessageList] = React.useState([])

  // re recieve messages from server
  const [getMessages, setGetMessages] = React.useState(true)

  // send message to server
  const[showAlertSuccess, setShowAlertSuccess] = React.useState(false)
  const[showAlertError, setShowAlertError] = React.useState(false)
  // success alert handling
  const handleSubmitFeedback = () => {
    if(userName === '' || userMessage === '') {
      setShowAlertError(true)
      setTimeout(()=>{
        setShowAlertError(false)
       },4000)
    }
    else{
     setShowAlertSuccess(true)
     setTimeout(()=>{
      setShowAlertSuccess(false)
     },4000)
    }
    fetch('https://amir-base-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json',
   
         {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              userName: userName,
              userMessage: userMessage,
          })
        }
    )
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setUserMessage('')
      setUserName('')
      setGetMessages(true)
    })
  }

  // get messages from server
  useEffect(() => {
    if(getMessages) {
      fetch('https://amir-base-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const loadedFeedback = [];
        for(const key in data) {
          loadedFeedback.push({
            id: key,
            userName: data[key].userName,
            userMessage: data[key].userMessage,
          })
        }
        console.log(loadedFeedback)
        setMessageList(loadedFeedback)
      })
      setGetMessages(false)
    }
  }, [getMessages])

  return (
    <div>
{showAlertSuccess?
      <div>
<div><Alert className='alert' severity="success">Thank You For Your Feedback!!!</Alert></div>
      
      </div>:null}
{showAlertError?
      <div>
<div><Alert className='alert' severity="error">Please fill all the fields</Alert></div>
      
      </div>:null}
      
       <div className='app-container'>
      <div className='form-container'>
        <h2>Feedback Form</h2>
        <TextField
          required
          className='form-input'
          id="outlined-required"
          label="Full Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <TextField
        className='form-input'
          id="outlined-textarea"
          label="Feedback"
          placeholder="Enter Your Feedback"
          rows={4}
          multiline              
          // fullWidth
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />


      <Button variant="contained"
        onClick={handleSubmitFeedback} 
      >Submit</Button>
      </div>

      <div className='feedback-container'>
        {
          messageList && messageList.map((item, index) => {
            return
            //  (
              
            //   // <div className='feedback-item' key={index}>
            //   //   <h3>{item.userName}</h3>
            //   //   <p>{item.userMessage}</p>
            //   // </div>
            // )
          })
        }
      </div>
    </div> 
    </div>
     
  );
}

export default App;
