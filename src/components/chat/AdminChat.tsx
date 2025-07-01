
import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

export default function AdminChat() {
  const [selectedConversation, setSelectedConversation] = useState<{
    id: string;
    clientName: string;
  } | null>(null);

  const handleSelectConversation = (conversationId: string, clientName: string) => {
    setSelectedConversation({ id: conversationId, clientName });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <ChatList
          onSelectConversation={handleSelectConversation}
          selectedConversationId={selectedConversation?.id}
        />
      </div>
      <div>
        {selectedConversation ? (
          <ChatWindow
            conversationId={selectedConversation.id}
            currentUserId="admin"
            userType="admin"
            clientName={selectedConversation.clientName}
          />
        ) : (
          <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Selecione uma conversa para iniciar o chat</p>
          </div>
        )}
      </div>
    </div>
  );
}
