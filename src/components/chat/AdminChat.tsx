
import React from 'react';
import ChatWindow from './ChatWindow';

interface AdminChatProps {
  clientId: string;
  clientName: string;
  adminId: string;
}

const AdminChat = ({ clientId, clientName, adminId }: AdminChatProps) => {
  return (
    <div className="w-full">
      <ChatWindow
        clientId={clientId}
        clientName={clientName}
        isAdmin={true}
        currentUserId={adminId}
      />
    </div>
  );
};

export default AdminChat;
