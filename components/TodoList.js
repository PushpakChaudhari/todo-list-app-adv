import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <div className="mt-4 px-5">
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 mt-44 ">
          <img src="/images/nodata.png" alt="No tasks" className="w-20 h-20 mb-4" />
          <p className="text-gray-600 text-lg">You have no task listed.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
