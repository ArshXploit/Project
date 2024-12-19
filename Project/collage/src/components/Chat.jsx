import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Menu, Trash2, Clock } from 'lucide-react';

const AI_MODELS = [
  { 
    id: 'mixtral-8x7b-32768', 
    name: 'Mixtral 8x7B',
    description: 'Advanced multi-language model'
  },
  { 
    id: 'llama2-70b-4096', 
    name: 'Llama 2 70B',
    description: 'Powerful language model by Meta'
  },
  { 
    id: 'gemma-7b-it', 
    name: 'Gemma 7B',
    description: 'Google lightweight model'
  }
];

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 && !isLoading) {
      const newHistoryEntry = {
        id: Date.now(),
        model: selectedModel.name,
        messages: messages,
        timestamp: new Date().toLocaleString()
      };

      const updatedHistory = [newHistoryEntry, ...chatHistory].slice(0, 10);
      setChatHistory(updatedHistory);
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    }
  }, [isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: selectedModel.id,
          messages: [
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: inputMessage }
          ]
        })
      });

      const data = await response.json();
      const aiResponse = {
        id: Date.now() + 1,
        text: data.choices[0].message.content,
        sender: 'ai'
      };

      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, {
        id: Date.now() + 1,
        text: 'Sorry, there was an error processing your message.',
        sender: 'ai'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadHistoricalChat = (historicalChat) => {
    setMessages(historicalChat.messages);
    setSelectedModel(AI_MODELS.find(model => model.name === historicalChat.model));
    setIsSidebarOpen(false);
  };

  const clearCurrentChat = () => {
    setMessages([]);
  };

  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem('chatHistory');
  };

  return (
    <div className="flex h-screen bg-orange-50">
      <div className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-white shadow-xl transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:static md:translate-x-0
      `}>
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-orange-600">Chat History</h2>
          <button 
            onClick={clearChatHistory}
            className="text-red-500 hover:bg-red-50 p-2 rounded"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-100px)]">
          {chatHistory.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => loadHistoricalChat(chat)}
              className="p-4 border-b hover:bg-orange-50 cursor-pointer flex items-center"
            >
              <Clock className="mr-2 text-orange-500" />
              <div>
                <p className="font-semibold text-gray-800">{chat.model}</p>
                <p className="text-sm text-gray-500">{chat.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 md:hidden"
            >
              <Menu />
            </button>
            <Bot className="mr-2" />
            <h2 className="text-lg font-bold">Chat with {selectedModel.name}</h2>
          </div>
          <div className="flex items-center">
            <select 
              value={selectedModel.id}
              onChange={(e) => {
                const model = AI_MODELS.find(m => m.id === e.target.value);
                setSelectedModel(model);
              }}
              className="bg-orange-600 text-white p-1 rounded"
            >
              {AI_MODELS.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            <button 
              onClick={clearCurrentChat}
              className="ml-2 hover:bg-orange-600 p-2 rounded"
            >
              <Trash2 />
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start space-x-2 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'ai' && (
                <Bot className="w-6 h-6 text-orange-600" />
              )}
              <div 
                className={`
                  max-w-[70%] p-3 rounded-lg 
                  ${message.sender === 'user' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-orange-100 text-gray-800'}
                `}
              >
                {message.text}
              </div>
              {message.sender === 'user' && (
                <User className="w-6 h-6 text-orange-600" />
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start items-center space-x-2">
              <Bot className="w-6 h-6 text-orange-600" />
              <div className="bg-orange-100 p-3 rounded-lg">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white p-4 border-t border-orange-200 flex items-center">
          <input 
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-orange-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-orange-500 text-white p-2 rounded-r-lg hover:bg-orange-600 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;