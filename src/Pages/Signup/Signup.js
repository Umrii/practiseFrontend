import React,{useState} from 'react'
import './Signup.css'
import axios from 'axios'; 
const Signup = () => {
  const [username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const handleUsernameChange=(event)=>{
    setUsername(event.target.value)

  }
  const handlePasswordChange=(event)=>{
    setPassword(event.target.value)
    
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    
      await axios.post('/api/users/signup', { username, password });
      alert('User signed up successfully!');
    
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error signing up user:', error);
      alert('Error signing up user');
    }
    
  };
 
  return (
    <div className="Signup">
      <form onSubmit={handleSubmit} >
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}  
          required
        />
      </div>
      <button type="submit">Signup</button>
    </form>

      
    </div>
  )
}

export default Signup
