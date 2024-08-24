import React, { useEffect, useState } from 'react';

interface Message {
  user: string;
  text: string;
}

interface ChatProps {
  user: { username: string };
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`http://localhost:5000/api/messages?user=${user.username}`)
       
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, [user]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = { user: user.username, text: newMessage };

    await fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          required
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;