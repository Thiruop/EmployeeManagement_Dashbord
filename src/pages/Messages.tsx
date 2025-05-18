import { useState } from 'react';
import { Search, Edit, Trash2, SendHorizontal } from 'lucide-react';
import UserAvatar from '../components/UserAvatar';

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  unread: boolean;
}

const Messages = () => {
  const [activeChat, setActiveChat] = useState<string | null>('1');
  const [message, setMessage] = useState('');
  
  const chats: Message[] = [
    {
      id: '1',
      sender: {
        name: 'Maria Garcia',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
      },
      content: 'Hi, I need help with my project assignment.',
      timestamp: '10:30 AM',
      unread: true
    },
    {
      id: '2',
      sender: {
        name: 'James Wilson',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      },
      content: 'When is the next team meeting?',
      timestamp: 'Yesterday',
      unread: false
    },
    {
      id: '3',
      sender: {
        name: 'Emily Chen',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'
      },
      content: 'The API integration is complete.',
      timestamp: 'Yesterday',
      unread: false
    },
    {
      id: '4',
      sender: {
        name: 'Robert Johnson',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
      },
      content: 'Can we discuss the client acquisition strategy?',
      timestamp: 'Monday',
      unread: false
    }
  ];
  
  const conversation = [
    {
      id: '1',
      sender: 'them',
      content: 'Hi, I need help with my project assignment.',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      sender: 'me',
      content: 'Sure, I\'d be happy to help. What specific part are you struggling with?',
      timestamp: '10:32 AM'
    },
    {
      id: '3',
      sender: 'them',
      content: 'I\'m having trouble with the database schema design. Could you review it?',
      timestamp: '10:35 AM'
    },
    {
      id: '4',
      sender: 'me',
      content: 'Of course. Can you share the current schema with me?',
      timestamp: '10:36 AM'
    },
    {
      id: '5',
      sender: 'them',
      content: 'Yes, I\'ll send it over shortly. Thank you!',
      timestamp: '10:40 AM'
    }
  ];
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, you would send the message to an API
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chat list */}
        <div className="md:col-span-1 card">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages"
                className="input pl-10"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {chats.map(chat => (
              <div 
                key={chat.id}
                className={`
                  p-4 cursor-pointer transition-colors duration-200
                  ${activeChat === chat.id ? 'bg-sky-50' : 'hover:bg-gray-50'}
                `}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="flex items-center gap-3">
                  <UserAvatar src={chat.sender.avatar} alt={chat.sender.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {chat.sender.name}
                      </h3>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {chat.content}
                    </p>
                  </div>
                  {chat.unread && (
                    <span className="h-2 w-2 bg-sky-500 rounded-full"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat conversation */}
        <div className="md:col-span-2 card flex flex-col h-[600px]">
          {activeChat ? (
            <>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserAvatar 
                    src={chats.find(c => c.id === activeChat)?.sender.avatar || ''} 
                    alt={chats.find(c => c.id === activeChat)?.sender.name || ''} 
                    size="md" 
                  />
                  <h2 className="text-sm font-medium">
                    {chats.find(c => c.id === activeChat)?.sender.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600">
                    <Edit size={18} />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversation.map(msg => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`
                        max-w-[80%] rounded-lg px-4 py-2
                        ${msg.sender === 'me' 
                          ? 'bg-sky-500 text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'}
                      `}
                    >
                      <p>{msg.content}</p>
                      <span className={`text-xs mt-1 block text-right ${msg.sender === 'me' ? 'text-sky-100' : 'text-gray-500'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="input flex-1"
                  />
                  <button 
                    type="submit"
                    className="btn btn-primary px-3"
                    disabled={!message.trim()}
                  >
                    <SendHorizontal size={18} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;