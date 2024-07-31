import React, { useState, useEffect, useContext, useRef } from 'react';
import InitialContent from './InitialContent';
import TextInput from './TextInput';
import ChatMessages from './ChatMessages';
import { fetchOpenAIResponse } from '@/api/openai';
import { AppContext } from '@/app/AppContext';

const ChatScreen = () => {
  const { selectedPrompt, setSelectedPrompt, notebooks, currentNotebookId, addMessageToNotebook, updateLastMessageInNotebook } = useContext(AppContext);
  const currentNotebook = notebooks.find(nb => nb.id === currentNotebookId);
  const messagesEndRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (selectedPrompt) {
      startChatWithPrompt(selectedPrompt);
    }
  }, [selectedPrompt]);

  useEffect(() => {
    scrollToBottom();
  }, [currentNotebook ? currentNotebook.messages : []]);

  const startChatWithPrompt = async (prompt) => {
    const message = { text: prompt, isUser: true };
    addMessageToNotebook(currentNotebookId, message);
    setIsStreaming(true);
    try {
      const fullText = await fetchOpenAIResponse([message]);
      addMessageToNotebook(currentNotebookId, { text: '', isUser: false }); // Add placeholder for response
      simulateStreamingResponse(fullText);
    } catch (error) {
      console.error('Error:', error);
    }
    setSelectedPrompt(null);
  };

  const handleSendMessage = async (text, files) => {
    const molFile = files.find(file => file.name.endsWith('.mol'));
    const message = { text, isUser: true };
    addMessageToNotebook(currentNotebookId, message);
    setIsStreaming(true);

    if (molFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const molContent = e.target.result;
        if (text.trim()) {
          try {
            const fullText = await fetchOpenAIResponse([...currentNotebook.messages, message]);
            addMessageToNotebook(currentNotebookId, { text: '', isUser: false }); // Add placeholder for response
            simulateStreamingResponse(fullText, molContent);
          } catch (error) {
            console.error('Error:', error);
          }
        } else {
          addMessageToNotebook(currentNotebookId, { text: molContent, isUser: false, isMol: true });
        }
      };
      reader.readAsText(molFile);
    } else {
      try {
        const fullText = await fetchOpenAIResponse([...currentNotebook.messages, message]);
        addMessageToNotebook(currentNotebookId, { text: '', isUser: false }); // Add placeholder for response
        simulateStreamingResponse(fullText);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const simulateStreamingResponse = (fullText, molContent = null) => {
    let currentText = '';
    let charIndex = 0;
    const intervalId = setInterval(() => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];
        updateLastMessageInNotebook(currentNotebookId, currentText);
        charIndex++;
      } else {
        clearInterval(intervalId);
        setIsStreaming(false);
        if (molContent) {
          addMessageToNotebook(currentNotebookId, { text: '', isUser: false, isMol: true, molContent });
        }
      }
    }, 20);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col h-screen bg-white w-full max-w-5xl mx-auto p-4">
      {currentNotebook && currentNotebook.messages.length === 0 ? (
        <InitialContent />
      ) : (
        <div className="flex-1 overflow-y-auto">
          <ChatMessages messages={currentNotebook ? currentNotebook.messages : []} isStreaming={isStreaming} />
          <div ref={messagesEndRef} />
        </div>
      )}
      <div className="fixed bottom-0 w-full max-w-5xl bg-white p-4">
        <TextInput onSendMessage={handleSendMessage} />
      </div>
      <div className="absolute top-4 right-4 text-xl font-semibold">
        {currentNotebook ? currentNotebook.name : 'No Notebook Selected'}
      </div>
    </div>
  );
};

export default ChatScreen;
