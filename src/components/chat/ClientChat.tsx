
import React from 'react';
import ChatWindow from './ChatWindow';

interface ClientChatProps {
  clientId: string;
  clientName: string;
}

const ClientChat = ({ clientId, clientName }: ClientChatProps) => {
  return (
    <div className="w-full">
      <ChatWindow
        clientId={clientId}
        clientName={clientName}
        isAdmin={false}
        currentUserId={clientId}
      />
    </div>
  );
};

export default ClientChat;
