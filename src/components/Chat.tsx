import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import Send from "../assets/send.svg";
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ComputerIcon from '@mui/icons-material/Computer';
interface Message {
  text: string;
  sender: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const typingInterval = useRef<any>(null);


  useEffect(() => {
    if (typing) {
      typingInterval.current = setInterval(() => {
        if (currentMessage.length < botResponse.length) {
          setCurrentMessage(
            (prevMessage) => prevMessage + botResponse[currentMessage.length]
          );
        } else {
          clearInterval(typingInterval.current);
          setTyping(false);
        }
      }, 50); // Typing speed
      return () => clearInterval(typingInterval.current);
    } else {
      currentMessage.length > 0 &&
        setMessages([
          ...messages,
          { text: currentMessage.toString(), sender: "bot" },
        ]);
      setCurrentMessage("");
    }
  }, [typing, currentMessage]);

  const handleUserMessageSend = (messageText: string) => {
    if (messageText.length > 0) {
      setMessages([...messages, { text: messageText, sender: "user" }]);
      setInputValue("");
      setLoading(true)
      setTimeout(() => {
        setTyping(true);
        setLoading(false)
      }, 4500);
    }
  };

  const botResponse = "Hello! How can I assist you today?";

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={`message-container ${message.sender === "bot" ? "" : "user-container"}`}>
            {message.sender === "bot" ?
              <ComputerIcon /> :
              <AccountCircleIcon />
            }
            <div className={`message ${message.sender}`}>
              {message.text}
            </div>
          </div>
        ))}
        {typing && currentMessage.length > 0 && (
          <div className={`message-container`}>
            <ComputerIcon />
            <label className="message bot">
              {currentMessage}
            </label>
          </div>

        )}
      </div>
      {loading && (
        <CircularProgress size={30} />
      )}
      <div className="camera-chat-input-container">
        <input
          className="camera-chat-input"
          type="text"
          value={inputValue}
          placeholder="Type a message..."
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUserMessageSend(inputValue);
            }
          }}
        />
        <img
          onClick={() => handleUserMessageSend(inputValue)}
          aria-disabled={inputValue.length === 0}
          className="img-send"
          src={!!Send ? Send : ""}
          alt={"icon"}
        />
      </div>
    </div>
  );
};

export default Chat;