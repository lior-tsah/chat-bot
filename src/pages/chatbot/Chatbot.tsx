import Chat from "../../components/Chat";
import Send from "../../assets/send.svg";
import Logo from "../../logo.svg";
import "./Chatbot.css";

interface Props {
  mainLogo?: string;
  seconderyLogo?: string;
  title?: string;

}

const Chatbot = ({
  mainLogo = Logo,
  seconderyLogo = Send,
  title = "Generic Chat Title",
}: Props) => {

  return (
    <div className="camera-chat-main-container">
      <div className="camera-settings-container">
        <div className="icons-container">
          <img className="camera-settings-title img-send" src={mainLogo} />
          <label className="camera-settings-title orange-status-name">
            {title}
          </label>
        </div>
        <img
          className="img-send"
          src={seconderyLogo}
          alt={"icon"}
        />
      </div>
      <Chat />
    </div>
  );
};

export default Chatbot;