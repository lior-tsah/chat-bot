import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import axios from "axios"; // Step 1: Import axios
import Send from "../assets/send.svg";
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ComputerIcon from '@mui/icons-material/Computer';
import { useSession } from "../pages/main/MainContext";
interface Message {
  text: string;
  sender: string;
}

const Chat: React.FC = () => {
  const { sessionId, clientId } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [botResponse, setBotResponse] = useState("Hello! How can I assist you today?");

  const typingInterval = useRef<any>(null);


  // useEffect(() => {
  //   const fetchChatHistory = async () => {
  //     setLoading(true);
  //     try {
  //       /*
  //         wait for the API to be ready
  //       // Step 4: Update the URL and parameters as needed for your API

  //       const response = await axios.get(`your-api-endpoint/chat-history?sessionId=${sessionId}&clientId=${clientId}`);
  //       */
  //       const response = {
  //         data: [
  //           { text: "hi how are you?", sender: "user" },
  //           { text: "Hello! How can I assist you today?", sender: "bot" },
  //           { text: "hi how are you?", sender: "user" },
  //           { text: "Hello! How can I assist you today?", sender: "bot" },
  //           { text: "hi how are you?", sender: "user" },
  //           { text: "Hello! How can I assist you today?", sender: "bot" },
  //         ], // Sample response
  //       }
  //       setMessages(response.data); // Adjust according to your response structure
  //     } catch (error) {
  //       console.error("Failed to fetch chat history:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchChatHistory();
  // }, [sessionId, clientId]); // Step 3: Fetch chat history when component mounts or sessionId/clientId changes

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

  const handleUserMessageSend = async (messageText: string) => {
    if (messageText.length > 0) {
      // Step 5: Send the user message to your API
      /*
      try {
        setMessages([...messages, { text: messageText, sender: "user" }]);
        setInputValue("");
        setLoading(true);
        const response = axios.post(`your-api-endpoint/send-message`, {
          sessionId,
          clientId,
          message: messageText,
        });
        setBotResponse(response.data.message); // Adjust according to your response structure
        setTyping(true);
        setLoading(false); 
      }
      catch (error) {
        console.error("Failed to send message:", error);
      }
      */

     // example until the API is ready
      setMessages([...messages, { text: messageText, sender: "user" }]);
      setInputValue("");
      setLoading(true);
      setBotResponse("I'm sorry, I'm a demo bot and I can't process your message right now. Please try again later.");
      setTimeout(() => {
        setTyping(true);
        setLoading(false)
      }, 4500);
    }
  };


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