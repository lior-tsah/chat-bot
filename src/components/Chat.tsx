import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import Send from "../assets/send.svg";

interface Message {
  text: string;
  sender: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
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
      setTimeout(() => {
        setTyping(true);
      }, 1500);
    }
  };

  const botResponse = "Hello! How can I assist you today?";

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {typing && currentMessage.length > 0 && (
          <div className="message bot">{currentMessage}</div>
        )}
      </div>
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