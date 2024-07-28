import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context state
interface SessionContextState {
  sessionId: string | null;
  clientId: string | null;
  setSessionId: (sessionId: string | null) => void;
  setClientId: (clientId: string | null) => void;
}

// Create a context with a default value
const SessionContext = createContext<SessionContextState>({
  sessionId: null,
  clientId: null,
  setSessionId: () => {},
  setClientId: () => {},
});

interface Props {
    children: React.ReactNode;
}
// Create a provider component
export const SessionProvider: React.FC<Props> = ({ children }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  return (
    <SessionContext.Provider value={{ sessionId, clientId, setSessionId, setClientId }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to use the session context
export const useSession = () => useContext(SessionContext);