import React, { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
      setIsModalOpen(false); // Close modal after adding task
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 px-5 ">
        {/* Title Section */}
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Todo Lists</h1>
          <p className="text-gray-600">Essential Tasks to Accomplish Today</p>
        </div>
        
        {/* Buttons Section */}
        <div className="flex gap-2">
          {/* Button for opening modal */}
          <button 
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-3 bg-[#033487] hover:bg-blue-800 text-white rounded-lg flex items-center gap-2 shadow-md transition duration-200"
          >
            <span className="w-6 h-6 flex items-center justify-center">
              <img src="/images/Frame.png" alt="Add Task" className="w-5 h-5" />
            </span>
            Add Task
          </button>

          {/* Share Button */}
          <button
            type="button"
            className="px-4 py-3 bg-[#D9E1ED] hover:bg-blue-50 text-gray-700 rounded-full flex items-center gap-2 shadow-md transition duration-200"
          >
            <span className="w-6 h-6 flex items-center justify-center">
              <img src="/images/share.png" alt="Share" className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>

      {/* Modal for adding task */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-5 w-full max-w-lg mx-5 shadow-lg">
            {/* Header with Close Button */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Add your todo's</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✖
              </button>
            </div>

            {/* Textarea for adding a task */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="✏️ Write your todo..."
              className="w-full p-3 border border-gray-300 rounded-lg h-24"
            ></textarea>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-3 bg-[#033487] hover:bg-blue-800 text-white py-2 rounded-lg"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoForm;