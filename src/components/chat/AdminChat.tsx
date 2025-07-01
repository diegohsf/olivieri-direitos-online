
import React from 'react';
import ChatWindow from './ChatWindow';

interface AdminChatProps {
  clientId: string;
  clientName: string;
  adminId?: string;
}

const AdminChat = ({ clientId, clientName, adminId }: AdminChatProps) => {
  // Gerar um UUID válido para o admin se não fornecido
  const validAdminId = adminId || '00000000-0000-0000-0000-000000000001';
  
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
