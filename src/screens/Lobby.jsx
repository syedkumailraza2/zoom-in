import React, { useState, useCallback, useEffect} from 'react';
import {useSocket} from '../context/SocketProvider'
import {useNavigate} from 'react-router-dom'

const LobbyScreen = () => {
    //managing state of the app using useState Hook
    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');

    const socket = useSocket()
    const navigate = useNavigate()
  
    //function to handle form submut
    const handleSubmitForm = useCallback((e) => {
      e.preventDefault();
      // Handle form submission
      socket.emit('room:join', {email,room})
    }, [room,email,socket])
  
    //handle room join
    const handleJoinRoom = useCallback((data)=>{
      const {email, room} = data
      navigate(`/room/${room}`)
    },[navigate])

    useEffect(()=>{
      socket.on('room:join', handleJoinRoom)
      return ()=>{
        socket.off('room:join', handleJoinRoom)
      }
    })

    //UI
    return (
      <div className="lobby-container">
        <div className="form-card">
          <h1 className="form-title">Welcome to ZoomIn</h1>
          
          <form onSubmit={handleSubmitForm} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="room">Room ID</label>
              <input
                id="room"
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
              />
            </div>
  
            <button type="submit" className="join-button">
              Join Room
            </button>
          </form>
        </div>
  
        <style jsx>{`
        label {
        align-self:start
        }

          .lobby-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to bottom, #f0f7ff, #ffffff);
            padding: 1rem;
          }
  
          .form-card {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
          }
  
          .form-title {
            text-align: center;
            color: #1e40af;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1.5rem;
          }
  
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
  
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
  
          .form-group label {
            font-size: 0.875rem;
            font-weight: 500;
            color: #374151;
          }
  
          .form-group input {
            padding: 0.75rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.375rem;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
  
          .form-group input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
  
          .join-button {
            background-color: #2563eb;
            color: white;
            padding: 0.875rem;
            border: none;
            border-radius: 0.375rem;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
          }
  
          .join-button:hover {
            background-color: #1d4ed8;
          }
        `}</style>
      </div>
    );
};

export default LobbyScreen;