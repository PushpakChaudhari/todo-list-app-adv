import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Slidebar';
import TaskGroup from '../components/TaskGroup';

const HomePage = () => {
  const [taskGroups, setTaskGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  // Load task groups from localStorage on component mount
  useEffect(() => {
    const storedTaskGroups = localStorage.getItem('taskGroups');
    if (storedTaskGroups) {
      setTaskGroups(JSON.parse(storedTaskGroups));
    }
  }, []);

  // Save task groups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('taskGroups', JSON.stringify(taskGroups));
  }, [taskGroups]);

  const createGroup = (name,color) => {
    const newGroup = { id: Date.now(), name,color, todos: [] };
    setTaskGroups([...taskGroups, newGroup]);
    setSelectedGroupId(newGroup.id);
  };

  const selectGroup = (id) => {
    setSelectedGroupId(id);
  };

  const addTodo = (groupId, text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTaskGroups(
      taskGroups.map((group) =>
        group.id === groupId ? { ...group, todos: [...group.todos, newTodo] } : group
      )
    );
  };

  const toggleTodo = (groupId, todoId) => {
    setTaskGroups(
      taskGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              todos: group.todos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
              ),
            }
          : group
      )
    );
  };

  const deleteTodo = (groupId, todoId) => {
    setTaskGroups(
      taskGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              todos: group.todos.filter((todo) => todo.id !== todoId),
            }
          : group
      )
    );
  };

  const editTodo = (groupId, todoId) => {
    const todoToEdit = taskGroups
      .find((group) => group.id === groupId)
      .todos.find((todo) => todo.id === todoId);
    setEditingTodo(todoToEdit);
  };

  const updateTodo = (groupId, todoId, updatedText) => {
    setTaskGroups(
      taskGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              todos: group.todos.map((todo) =>
                todo.id === todoId ? { ...todo, text: updatedText } : todo
              ),
            }
          : group
      )
    );
    setEditingTodo(null);
  };

  const deleteGroup = (groupId) => {
    setTaskGroups(taskGroups.filter((group) => group.id !== groupId));
    
    // If the deleted group was selected, reset selection
    if (selectedGroupId === groupId) {
      setSelectedGroupId(null);
    }
  };
  

  const selectedGroup = taskGroups.find((group) => group.id === selectedGroupId);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        taskGroups={taskGroups.map((group) => ({
          ...group,
          count: group.todos.length, // Add count dynamically
        }))}
        onCreateGroup={createGroup}
        onSelectGroup={selectGroup}
        onDeleteGroup={deleteGroup} 
      />
      {selectedGroup && (
        <TaskGroup
          group={selectedGroup}
          onAdd={addTodo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          editingTodo={editingTodo}
          onUpdate={updateTodo}
          onCancel={() => setEditingTodo(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
