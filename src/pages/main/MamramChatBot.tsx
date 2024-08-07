import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import '../../App.css';
import Chatbot from '../chatbot/Chatbot';
import { Button, Popover, Zoom } from '@mui/material';
import { SessionProvider, useSession } from './MainContext';
import { v4 as uuidv4 } from 'uuid'; // Import v4 function from uuid

interface Props {
  clientId: string;
  mainLogo?: string;
  seconderyLogo?: string;
  title?: string;
}

const MamaramChatBot: React.FC<Props> = ({ clientId, mainLogo, seconderyLogo, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { setSessionId, setClientId } = useSession();
  const sessionId = uuidv4();


  useEffect(() => {
    console.log(sessionId);
    console.log(clientId);
    setSessionId(sessionId);
    setClientId(clientId);
  }, [clientId, sessionId]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div className='circle-btn-container'>
        <button className='circle-btn' onClick={handleClick}>
          <img className='circle-btn' src={logo} />
        </button>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        TransitionComponent={Zoom}
        transitionDuration={700}
        sx={{
          '& .MuiPaper-root': {
            display: "flex",
            marginTop: 3,
            /* flex: 1 1, */
            height: "67%",
            width: "43%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            overflow: "hidden",
            // border: "2.5px solid #ddd",
            borderRadius: "16px",
            background: "#fff",
          },


        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <SessionProvider>
          <Chatbot
            mainLogo={mainLogo}
            seconderyLogo={seconderyLogo}
            title={title}
          />
        </SessionProvider>
      </Popover>
    </>
  );
}

export default MamaramChatBot;
