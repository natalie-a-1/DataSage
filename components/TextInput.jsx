import React, { useState, useEffect, useRef } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { GiBarrel } from 'react-icons/gi';
import { BiVector } from 'react-icons/bi';
import { PiGraph } from 'react-icons/pi';
import { LuWand2 } from 'react-icons/lu';
import { RxUpload } from 'react-icons/rx';
import { PiAtomLight } from 'react-icons/pi';
import { CiFileOn, CiImageOn } from 'react-icons/ci';

const sourceIcons = {
  KEGG: <GiBarrel className="w-4 h-4" />,
  'Vector Database': <BiVector className="w-4 h-4" />,
  'Knowledge Graph': <PiGraph className="w-4 h-4" />,
};

const TextInput = ({ onSendMessage, isMessageSent, isStreaming }) => {
  const [selectedSource, setSelectedSource] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputText, setInputText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [initial, setInitial] = useState(true); // State to track if it's the initial input screen
  const dropdownRef = useRef(null);
  const maxLength = 2000;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSourceSelect = (source) => {
    setSelectedSource(selectedSource === source ? '' : source);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const filteredSources = ['KEGG', 'Vector Database', 'Knowledge Graph'].filter((source) =>
    source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setInputText(e.target.value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (inputText.trim() || uploadedFiles.length > 0) && !isStreaming) {
      onSendMessage(inputText, uploadedFiles);
      setInputText('');
      setUploadedFiles([]);
      setInitial(false); // Switch to the smaller input box after sending the first message
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (fileName) => {
    setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.mol')) return <PiAtomLight />;
    if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) return <CiImageOn />;
    return <CiFileOn />;
  };

  return (
    <div className="w-full p-4 mx-auto relative">
      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap space-x-2 mb-2">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center text-xs border rounded-lg px-2 py-1 space-x-1">
              {getFileIcon(file.name)}
              <span className='text-xs mr-4'>{file.name}</span>
              <button onClick={() => removeFile(file.name)} className="text-gray-900">x</button>
            </div>
          ))}
        </div>
      )}
      {initial ? (
        <div className="flex flex-col border rounded-lg p-4 bg-gray-100 relative h-28">
          <div className="flex items-center mb-1">
            <LuWand2 className="mr-2" />
            <input
              type="text"
              placeholder="Ask AI a question or make a request..."
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none text-sm placeholder-bold h-full"
              disabled={isStreaming}
            />
          </div>
          <div className="absolute bottom-0 left-0 mb-2 ml-2">
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm"
              disabled={isStreaming}
            >
              {selectedSource ? (
                <>
                  <span>{selectedSource}</span>
                  <span className="ml-2">{sourceIcons[selectedSource]}</span>
                </>
              ) : (
                'Select source'
              )}
              <IoMdArrowDropdown className="ml-1" />
            </button>
            {showDropdown && (
              <div ref={dropdownRef} className="absolute bottom-full mb-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-48">
                <div className="p-2">
                  <div className="flex items-center p-2">
                    <FiSearch className="mr-2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="flex-1 bg-transparent outline-none text-xs"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      disabled={isStreaming}
                    />
                  </div>
                  <ul>
                    {filteredSources.map((item) => (
                      <li
                        key={item}
                        className={`p-2 hover:bg-gray-200 cursor-pointer flex items-center text-xs ${selectedSource === item ? 'bg-gray-200' : ''}`}
                        onClick={() => handleSourceSelect(item)}
                      >
                        {sourceIcons[item]}
                        <span className="ml-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center absolute bottom-2 right-2 space-x-2">
            <label className="flex items-center bg-gray-200 rounded-lg px-3 py-2 cursor-pointer">
              <RxUpload className="" />
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
                disabled={isStreaming}
              />
            </label>
            <button
              className={`ml-2 rounded-lg px-3 py-2 ${isStreaming ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-300'}`}
              onClick={() => {
                if ((inputText.trim() || uploadedFiles.length > 0) && !isStreaming) {
                  onSendMessage(inputText, uploadedFiles);
                  setInputText('');
                  setUploadedFiles([]);
                  setInitial(false); // Switch to the smaller input box after sending the first message
                }
              }}
              disabled={isStreaming}
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center border rounded-lg p-2 bg-gray-100">
          <LuWand2 className="mr-2" />
          <input
            type="text"
            placeholder="Ask AI a question or make a request..."
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent outline-none text-sm"
            disabled={isStreaming}
          />
          <label className="flex items-center bg-gray-200 rounded-lg px-3 py-2 cursor-pointer">
            <RxUpload className="" />
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              disabled={isStreaming}
            />
          </label>
          <button
            className={`ml-2 rounded-lg px-3 py-2 ${isStreaming ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-300'}`}
            onClick={() => {
              if ((inputText.trim() || uploadedFiles.length > 0) && !isStreaming) {
                onSendMessage(inputText, uploadedFiles);
                setInputText('');
                setUploadedFiles([]);
              }
            }}
            disabled={isStreaming}
          >
            <FaRegPaperPlane />
          </button>
        </div>
      )}
    </div>
  );
};

export default TextInput;
