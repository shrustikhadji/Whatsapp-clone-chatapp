import React, { useState, useEffect } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import Login from './Login';
import Register from './Register';
import './index.css';

const ChatApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState('');
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [shivaniMessages, setShivaniMessages] = useState([
    { content: 'hahaha', time: '9:22 PM', type: 'received' },
    { content: 'How are you?', time: '9:38 PM', type: 'sent' },
  ]);
  const [vishakhaMessages, setVishakhaMessages] = useState([
    { content: 'helloooo!!!', time: '9:22 PM', type: 'received' },
    { content: 'I am good, how about you?', time: '9:38 PM', type: 'sent' },
  ]);
  const [vaibhaviMessages, setVaibhaviMessages] = useState<{ content: string; time: string; type: string; }[]>([]);
  const [ayushMessages, setAyushMessages] = useState<{ content: string; time: string; type: string; }[]>([]);
  const [krutarthMessages, setKrutarthMessages] = useState<{ content: string; time: string; type: string; }[]>([]); // Specify type
  const [shrideviMessages, setShrideviMessages] = useState<{ content: string; time: string; type: string; }[]>([]); // Specify type
  const [momMessages, setMomMessages] = useState<{ content: string; time: string; type: string; }[]>([]); // Specify type
  const [isOnline, setIsOnline] = useState(true); // State to represent online status

  useEffect(() => {
    // Check local storage for login state
    const loggedIn = localStorage.getItem('isLoggedIn');
    const user = localStorage.getItem('currentUser');
    if (loggedIn === 'true' && user) {
      setCurrentUser(JSON.parse(user));
      setIsLoggedIn(true);
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    if (message.trim() !== '') {
      const newMessage = { content: message, time: new Date().toLocaleTimeString(), type: 'sent' };
      switch (currentChat) {
        case 'Shivani':
          setShivaniMessages([...shivaniMessages, newMessage]);
          break;
        case 'Vishakha':
          setVishakhaMessages(prevMessages => [...prevMessages, newMessage]);
          break;
        case 'Vaibhavi':
          setVaibhaviMessages(prevMessages => [...prevMessages, newMessage]);
          break;
        case 'Ayush':
          setAyushMessages(prevMessages => [...prevMessages, newMessage]);
          break;
        case 'Krutarth':
          setKrutarthMessages(prevMessages => [...prevMessages, newMessage]); 
          break;
        case 'Shridevi':
          setShrideviMessages(prevMessages => [...prevMessages, newMessage]);
          break;
        case 'Mom':
          setMomMessages(prevMessages => [...prevMessages, newMessage]);
          break;
        default:
          break;
      }
      e.preventDefault();
    const Message = { user: currentChat, text: message };

    await fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Message),
    });

      setMessage('');
    }
  };

  const addEmoji = (emoji: { native: string }) => {
    setMessage(message + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleLogout = () => {
    // Clear login state from local storage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const messages = (() => {
    switch (currentChat) {
      case 'Shivani':
        return shivaniMessages;
      case 'Vishakha':
        return vishakhaMessages;
      case 'Vaibhavi':
        return vaibhaviMessages;
      case 'Ayush':
        return ayushMessages;
      case 'Krutarth':
        return krutarthMessages;
      case 'Shridevi':
        return shrideviMessages;
      case 'Mom':
        return momMessages;
      default:
        return [];
    }
  })();

  const lastSeen: { [key: string]: string } = { // Updated type definition
    Shivani: 'Last seen at 10:00 AM',
    Vishakha: 'Last seen at 9:45 AM',
    Vaibhavi: 'Last seen at 8:30 AM',
    Ayush: 'Last seen at 11:15 AM',
    Krutarth: 'Last seen at 12:00 PM',
    Shridevi: 'Last seen at 1:45 PM',
    Mom: 'Last seen at 2:30 PM',
  };

  const getLastMessage = (contact: string) => {
    const contactMessages = (() => {
      switch (contact) {
        case 'Shivani':
          return shivaniMessages;
        case 'Vishakha':
          return vishakhaMessages;
        case 'Vaibhavi':
          return vaibhaviMessages;
        case 'Ayush':
          return ayushMessages;
        case 'Krutarth':
          return krutarthMessages;
        case 'Shridevi':
          return shrideviMessages;
        case 'Mom':
          return momMessages;
        default:
          return [];
      }
    })();
    return contactMessages.length > 0 ? contactMessages[contactMessages.length - 1] : null;
  };

  const contacts = ['Shivani', 'Vishakha', 'Vaibhavi', 'Ayush', 'Krutarth', 'Shridevi', 'Mom'];

  const sortedContacts = contacts.sort((a, b) => {
    const lastMessageA = getLastMessage(a);
    const lastMessageB = getLastMessage(b);
    if (!lastMessageA && !lastMessageB) return 0;
    if (!lastMessageA) return 1;
    if (!lastMessageB) return -1;
    return new Date(`2024/01/01 ${lastMessageB.time}`).getTime() - new Date(`2024/01/01 ${lastMessageA.time}`).getTime();
  });

  return (
    <div className="chat-container">
      {!isLoggedIn ? (
        isRegistering ? (
          <Register onRegister={handleLogin} onNavigateToLogin={() => setIsRegistering(false)} />
        ) : (
          <Login 
            onLogin={handleLogin} 
            onNavigateToRegister={() => setIsRegistering(true)} 
          />
        )
      ) : (
        <>
          <div className="sidebar">
            <div className="search-bar">
              <input type="text" placeholder="Search or start new chat" />
            </div>
            <div className="chat-list">
              {sortedContacts.map((contact) => (
                <div className="chat-item" key={contact} onClick={() => setCurrentChat(contact)}>
                  <div className="chat-avatar"></div>
                  <div className="chat-info">
                    <div className="chat-name">{contact}</div>
                    {contact === 'Shivani' || contact === 'Vishakha' ? (
                      <div className="chat-status">{isOnline ? 'Online' : 'Offline'}</div>
                    ) : (
                      <div className="chat-last-seen">{lastSeen[contact]}</div>
                    )}
                    <div className="chat-message">
                      {contact}: {getLastMessage(contact)?.content || 'No messages yet'}
                    </div>
                  </div>
                  <div className="chat-time">{lastSeen[contact]}</div>
                </div>
              ))}
            </div>
            <div className="settings-container">
              <button className="settings-button" onClick={() => setShowSettings(!showSettings)}>⚙️</button>
              {showSettings && (
                <div className="settings-dropdown">
                  <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
          {currentChat && (
            <div className="chat-window">
              <div className="chat-header">
                <div>
                  <div className="chat-title">{currentChat}</div>
                  {(currentChat === 'Shivani' || currentChat === 'Vishakha') && (
                    <div className="chat-status">
                      {isOnline ? 'Online' : 'Offline'}
                    </div>
                  )}
                </div>
                {/* <div className="chat-participants">{currentChat}, You</div> */}
              </div>
              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.type}`}>
                    <div className="message-content">{msg.content}</div>
                    <div className="message-time">{msg.time}</div>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                {showEmojiPicker && (
                  <Picker data={data} onEmojiSelect={addEmoji} style={{ position: 'absolute', bottom: '60px', left: '20px' }} />
                )}
                <input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatApp;