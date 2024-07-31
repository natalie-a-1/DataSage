import React, { useState, useEffect, useContext } from 'react';
import InitialContent from './InitialContent';
import TextInput from './TextInput';
import ChatMessages from './ChatMessages';
import { fetchOpenAIResponse } from '@/api/openai';
import { AppContext } from '@/app/AppContext';

const ChatScreen = () => {
  const { selectedPrompt, setSelectedPrompt, notebooks, currentNotebookId, addMessageToNotebook, updateLastMessageInNotebook } = useContext(AppContext);
  const currentNotebook = notebooks.find(nb => nb.id === currentNotebookId);

  useEffect(() => {
    if (selectedPrompt) {
      startChatWithPrompt(selectedPrompt);
    }
  }, [selectedPrompt]);

  const startChatWithPrompt = async (prompt) => {
    const message = { text: prompt, isUser: true };
    addMessageToNotebook(currentNotebookId, message);
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
        if (molContent) {
          addMessageToNotebook(currentNotebookId, { text: '', isUser: false, isMol: true, molContent });
        }
      }
    }, 20);
  };

  return (
    <div className="relative flex flex-col h-screen justify-between bg-white w-full max-w-5xl mx-auto p-4">
      {currentNotebook && currentNotebook.messages.length === 0 ? (
        <InitialContent />
      ) : (
        <ChatMessages messages={currentNotebook ? currentNotebook.messages : []} />
      )}
      <TextInput onSendMessage={handleSendMessage} />
      <div className="absolute top-4 right-4 text-xl font-semibold">
        {currentNotebook ? currentNotebook.name : 'No Notebook Selected'}
      </div>
    </div>
  );
};

export default ChatScreen;
