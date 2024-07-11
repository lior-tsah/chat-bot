import Chat from "../../components/Chat";
import Send from "../../assets/send.svg";
import "./Chatbot.css";
const Chatbot = () => {

  return (
    <div className="camera-chat-main-container">
      <div className="camera-settings-container">
        <div className="icons-container">
          <label className="camera-settings-title">Start Chat with</label>
          <label className="camera-settings-title orange-status-name">
            {"gfdg"}
          </label>
        </div>
        <img
          className="img-send"
          src={Send}
          alt={"icon"}
        />
      </div>
      <Chat />
    </div>
  );
};

export default Chatbot;