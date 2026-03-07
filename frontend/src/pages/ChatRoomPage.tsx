import React from 'react';
import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';

const ChatRoomPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        {/* TODO: Sidebar with room list */}
        <aside className="w-64 bg-white border-r p-4">
          <p className="text-gray-500">Rooms will appear here</p>
        </aside>
        <main className="flex-1 bg-gray-100">
          <ChatBox />
        </main>
      </div>
    </div>
  );
};

export default ChatRoomPage;
