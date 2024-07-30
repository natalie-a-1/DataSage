import React, { useContext } from 'react';
import { GoPulse } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import { AppContext } from '@/app/AppContext';

const InitialContent = () => {
  const { handleSeePromptLibrary, setSelectedPrompt } = useContext(AppContext);

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="text-center mb-6">
        <div className="flex justify-center items-center mb-4">
          <div className="w-16 h-16 bg-white border-2 rounded-md shadow-2xl flex items-center justify-center">
            <GoPulse size={32} weight="fill" />
          </div>
        </div>
        <h1 className="text-3xl font-mono mb-6">D A V A I</h1>
      </div>
      <div className="text-center mb-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button className="bg-white border-gray-300 border-[1px] text-xs rounded-full px-2 py-1" onClick={() => handlePromptSelect("Act as an excipient data scientist")}>Act as an excipient data scientist</button>
          <button className="bg-white border-gray-300 border-[1px] text-xs rounded-full px-2 py-1" onClick={() => handlePromptSelect("Analyze drug interactions")}>Analyze drug interactions</button>
          <button className="bg-white border-gray-300 border-[1px] text-xs rounded-full px-2 py-1" onClick={() => handlePromptSelect("Provide clinical trial insights")}>Provide clinical trial insights</button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <button className="bg-white border-gray-300 border-[1px] text-xs rounded-full px-2 py-1" onClick={() => handlePromptSelect("Summarize side effects data")}>Summarize side effects data</button>
          <button className="bg-white border-gray-300 border-[1px] text-xs rounded-full px-2 py-1" onClick={() => handlePromptSelect("Recommend dosage adjustments")}>Recommend dosage adjustments</button>
          <div className="flex items-center justify-center ml-2">
            <IoBookOutline size={15} className="text-gray-700 text-xs mr-2" />
            <button className="text-gray-700 text-sm" onClick={handleSeePromptLibrary}>See prompt library</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialContent;
