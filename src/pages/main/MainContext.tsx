import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context state
interface SessionContextState {
  sessionId: string | null;
  userId: string | null;
  setSessionId: (sessionId: string | null) => void;
  setUserId: (userId: string | null) => void;
}

// Create a context with a default value
const SessionContext = createContext<SessionContextState>({
  sessionId: null,
  userId: null,
  setSessionId: () => {},
  setUserId: () => {},
});

// Create a provider component
export const SessionProvider: React.FC = ({ children }: any) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <SessionContext.Provider value={{ sessionId, userId, setSessionId, setUserId }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to use the session context
export const useSession = () => useContext(SessionContext);