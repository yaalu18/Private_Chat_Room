import React, { useState } from 'react';
import io from 'socket.io-client';
import { createRoomHttp, createRoomSocket } from './api'; // Adjusted import
import ChatRoom from './ChatRoom';

// Establish a connection to the Socket.IO server
const socket = io('http://localhost:4000');

function App() {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState(null);
  const [error, setError] = useState('');

  const handleCreateRoom = async () => {
    try {
      await createRoomHttp(roomName); // Using HTTP method
      alert('Room created!');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleJoinRoom = () => {
    if (roomName && username) {
      socket.emit('joinRoom', { room: roomName, user: username });
      setRoom(roomName);
    } else {
      setError('Please enter both room name and username');
    }
  };

  if (room) {
    return <ChatRoom socket={socket} room={room} username={username} />;
  }

  return (
    <div className="App">
      <h1>Chat Room</h1>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create Room</button>
      <button onClick={handleJoinRoom}>Join Room</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
