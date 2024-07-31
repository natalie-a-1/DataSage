"use client";
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [notebooks, setNotebooks] = useState([{ id: 1, name: "Notebook 1", messages: [] }]);
  const [currentNotebookId, setCurrentNotebookId] = useState(1);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSeePromptLibrary = () => {
    setActiveMenu('presetPrompts');
  };

  const addNotebook = () => {
    const newId = notebooks.length + 1;
    setNotebooks([...notebooks, { id: newId, name: `Notebook ${newId}`, messages: [] }]);
    setCurrentNotebookId(newId);
  };

  const selectNotebook = (id) => {
    setCurrentNotebookId(id);
  };

  const addMessageToNotebook = (id, message) => {
    setNotebooks(prevNotebooks =>
      prevNotebooks.map(nb => nb.id === id ? { ...nb, messages: [...nb.messages, message] } : nb)
    );
  };

  const updateLastMessageInNotebook = (id, newText) => {
    setNotebooks(prevNotebooks =>
      prevNotebooks.map(nb => {
        if (nb.id === id) {
          const messages = [...nb.messages];
          const lastMessageIndex = messages.length - 1;
          if (lastMessageIndex >= 0 && !messages[lastMessageIndex].isUser) { // Only update the last non-user message
            messages[lastMessageIndex] = { ...messages[lastMessageIndex], text: newText };
          }
          return { ...nb, messages };
        }
        return nb;
      })
    );
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(prevState => !prevState);
  };

  return (
    <AppContext.Provider value={{
      activeMenu, setActiveMenu, handleSeePromptLibrary,
      selectedPrompt, setSelectedPrompt, notebooks, addNotebook, selectNotebook,
      currentNotebookId, addMessageToNotebook, updateLastMessageInNotebook, isSidebarExpanded, toggleSidebar
    }}>
      {children}
    </AppContext.Provider>
  );
};
