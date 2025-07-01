
import React from 'react';
import ChatWindow from './ChatWindow';

interface AdminChatProps {
  clientId: string;
  clientName: string;
  adminId?: string;
}

const AdminChat = ({ clientId, clientName, adminId }: AdminChatProps) => {
  // Gerar um UUID válido para o admin se não fornecido
  const validAdminId = adminId || crypto.randomUUID();
  
  return (
    <div className="w-full">
      <ChatWindow
        clientId={clientId}
        clientName={clientName}
        isAdmin={true}
        currentUserId={validAdminId}
      />
    </div>
  );
};

export default AdminChat;
