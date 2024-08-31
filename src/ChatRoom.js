import React, { useState, useEffect, useRef } from 'react';

function ChatRoom({ socket, room, username }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Scroll to the bottom of the chat when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Cleanup on component unmount
    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (message) {
      socket.emit('message', { user: username, text: message });
      setMessage('');
    }
  };

  return (
    <div className="ChatRoom">
      <h2>Room: {room}</h2>
      <div className="Messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;
