import React from 'react';

const TaskGroupList = ({ taskGroups, onSelectGroup, onDeleteGroup }) => {
  return (
    <div className="space-y-2">
      {taskGroups.map((group, index) => (
        <div
          key={group.id || index} // Ensure a unique key
          onClick={() => onSelectGroup(group.id)}
          className="flex justify-between items-center p-3 border border-gray-300 rounded-lg shadow-lg cursor-pointer transition duration-200 hover:opacity-80"
          style={{ backgroundColor: group.color || '#ffffff' }} // Set background color dynamically
        >
          {/* Group Name */}
          <span className="font-medium text-gray-700 flex-1">
            {group.name}
          </span>

          {/* Count + Delete Button */}
          <div className="flex items-center space-x-2">
            <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full">
              {group.count || 0} {/* Ensure count is displayed properly */}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent onClick of parent div
                onDeleteGroup(group.id);
              }}
              className="text-gray-500 hover:text-black"
              >
                ✖
              </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskGroupList;
