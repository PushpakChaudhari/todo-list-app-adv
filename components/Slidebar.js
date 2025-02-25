import React, { useState } from 'react';
import TaskGroupList from './TaskGroupList';

const colorOptions = [
  '#FFFFFF','#FF5733', '#FFA500', '#FFD700', '#ADFF2F', '#32CD32', '#00CED1', '#1E90FF',
  '#4169E1', '#8A2BE2', '#C71585', '#FF1493', '#DC143C', '#FF4500'
];

const Sidebar = ({ taskGroups, onCreateGroup, onSelectGroup,onDeleteGroup }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      onCreateGroup(newGroupName, selectedColor);
      setNewGroupName('');
      setSelectedColor(colorOptions[0]); // Reset color
      setIsModalOpen(false);
    }
  };



  return (
    <div className="lg:w-1/5 md:w-64 bg-white p-4 h-screen flex flex-col">
      {/* Logo Section */}
      <div className="flex justify-start p-3">
        <img src="/images/icone.png" alt="Logo" className="sm:w-32 md:w-52" />
      </div>

      {/* Greeting */}
      <div className="pt-4 pb-4">
        <h1 className="font-bold py-2">Good Morning, Pushpak!</h1>
        <p className="text-gray-500">Today, Web 24 Feb 2025</p>
      </div>

      {/* Task Group List */}
      <div className="flex-1 overflow-y-auto">
        <TaskGroupList taskGroups={taskGroups} onSelectGroup={onSelectGroup} onDeleteGroup={onDeleteGroup}  />
      </div>

      {/* Create New List Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-3 bg-[#033487] hover:bg-blue-700 text-white rounded-full mt-4 transition duration-200"
      >
        + Create new list
      </button>

      {/* Modal for adding new list */}
      {isModalOpen && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
       <div className="bg-white rounded-3xl p-6 w-full max-w-md sm:max-w-lg md:max-w-xl  shadow-lg">
         {/* Header with Close Button */}
         <div className="flex justify-between items-center mb-3 py-2">
           <h2 className="text-lg font-semibold">Create a new list</h2>
           <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black">✖</button>
         </div>
     
         {/* Input Field */}
         <input
           type="text"
           value={newGroupName}
           onChange={(e) => setNewGroupName(e.target.value)}
           placeholder="Enter list name"
           className="w-full p-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
         />
     
         {/* Color Palette */}
         <div className="mt-4 mb-3">
           <p className="text-gray-600 mb-2">Add Color</p>
           <div className="flex flex-wrap gap-2 ">
             {colorOptions.map((color) => (
               <button
                 key={color}
                 onClick={() => setSelectedColor(color)}
                 style={{ backgroundColor: color }}
                 className={`w-6 h-6  border-gray-400 border-2 ${
                   selectedColor === color ? 'border-black' : 'border-transparent'
                 }`}
               />
             ))}
           </div>
         </div>
     
         {/* Submit Button */}
         <button
           onClick={handleCreateGroup}
           className="w-full mt-4 bg-[#033487] hover:bg-blue-800 text-white py-5 rounded-2xl transition duration-200 text-xl "
         >
           Done
         </button>
       </div>
     </div>
     
      )}
    </div>
  );
};

export default Sidebar;
