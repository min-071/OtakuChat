import React from 'react';

interface ChatBoxProps {
  roomId?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ roomId }) => {
  return (
    <div className="flex flex-col h-full">
      {/* TODO: Messages list */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <p className="text-center text-gray-400">Select a room to start chatting...</p>
      </div>
      {/* TODO: Input field */}
      <div className="p-2 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
};

export default ChatBox;
