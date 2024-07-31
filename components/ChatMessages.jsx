import React from 'react';
import { LuWand2 } from 'react-icons/lu';
import Molecule3DViewer from '@/lib/Molecule3DViewer';

const ChatMessages = ({ messages, isStreaming }) => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      {messages.map((message, index) => (
        <div key={`${message.text}-${index}`} className="flex flex-col items-start space-y-2 max-w-full">
          <div className={`w-full ${message.isUser ?? 'text-left text-sm font-semibold'}`}>
            <div className="flex items-start space-x-2 max-w-full">
              {!message.isUser && (
                <div className={`flex items-center space-x-2 ${isStreaming && index === messages.length - 1 ? 'loading-animation' : ''}`}>
                  <LuWand2 className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-gray-600">Results</span>
                </div>
              )}
            </div>
            <p className={`mt-2 whitespace-pre-wrap ${message.isUser ? 'text-2xl font-bold' : 'text-sm text-gray-800'}`}>
              {message.text}
            </p>
            {message.isMol && <Molecule3DViewer moleculeData={message.molContent} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
