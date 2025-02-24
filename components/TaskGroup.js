import React from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import EditTodoForm from './EditTodoForm';

const TaskGroup = ({ group, onAdd, onToggle, onDelete, onEdit, editingTodo, onUpdate, onCancel }) => {
  return (
    <div className="flex-1 p-4 pt-14">
      {editingTodo && (
        <EditTodoForm
          todo={editingTodo}
          onUpdate={(todoId, updatedText) => onUpdate(group.id, todoId, updatedText)}
          onCancel={onCancel}
        />
      )}
      <TodoForm onAdd={(text) => onAdd(group.id, text)} />
      <TodoList
        todos={group.todos}
        onToggle={(todoId) => onToggle(group.id, todoId)}
        onDelete={(todoId) => onDelete(group.id, todoId)}
        onEdit={(todoId) => onEdit(group.id, todoId)}
      />
    </div>
  );
};

export default TaskGroup;
