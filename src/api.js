import axios from 'axios';
import io from 'socket.io-client';

// Create a socket connection to the server
//const socket = io('http://localhost:4000'); // Replace with your server's URL
const socket = io("provate-chat-room-server-1ge35su69-yaalu18s-projects.vercel.app"); // Replace with your server's URL

/**
 * Function to create a room via HTTP POST request.
 * @param {string} roomName - The name of the room to be created.
 */
export async function createRoomHttp(roomName) {
  if (!roomName) {
    console.error('Room name is required');
    return;
  }

  try {
    //const response = await axios.post('http://localhost:4000/createRoom', { name: roomName });
    const response = await axios.post('provate-chat-room-server-1ge35su69-yaalu18s-projects.vercel.app/createRoom', { name: roomName });
    console.log('Room created:', response.data);
    // Additional logic here (e.g., handle success response)
    return response.data;
  } catch (error) {
    console.error('Error creating room:', error);
    // Additional error handling here
    throw error;
  }
}

/**
 * Function to create a room using Socket.IO.
 * @param {string} name - The name of the room to be created.
 * @returns {Promise} - Resolves if the room was created successfully, rejects otherwise.
 */
export function createRoomSocket(name) {
  return new Promise((resolve, reject) => {
    // Listen for the server response or error
    socket.once('createRoomResponse', (response) => {
      if (response.success) {
        resolve(response.data);
      } else {
        reject(new Error(response.error || 'Room already exists'));
      }
    });

    // Emit the createRoom event to the server
    socket.emit('createRoom', { name });
  });
}

// Example usage (for testing or demo purposes)
// Uncomment the following lines if you want to use them as a quick test

// createRoomHttp('New Room Name').catch(err => console.error(err));
// createRoomSocket('New Room Name').then(data => console.log(data)).catch(err => console.error(err));

export default {
  createRoomHttp,
  createRoomSocket
};
