import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactWebChat, { createDirectLine } from "botframework-webchat";

const styleOptions = {
  backgroundColor: '#f0f0f0',
  color: '#333',
  padding: '10px',
  borderRadius: '5px',
  height: '500px',
  width: '400px',
}
const MamramChatBot: React.FC = () => {
  const [directLine, setDirectLine] = useState<ReturnType<
    typeof createDirectLine
  > | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(
          "https://b9d052cebfc8e44e900c2880c75c8d.12.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr811_copilot/directline/token?api-version=2022-03-01-preview"
        );
        const { token } = res.data;

        setDirectLine(createDirectLine({ token }));
      } catch (error) {
        console.error("Error fetching DirectLine token:", error);
      }
    };
    fetchToken();
  }, []);

  return (
    <section>
      {/* <header>Chat component is using React {React.version}</header> */}
      <div className="react-container webchat">
        {!!directLine && (
          <ReactWebChat directLine={directLine} styleOptions={styleOptions} />
        )}
      </div>
    </section>
  );
};

export default MamramChatBot;