import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './features/todoSlice';
import { Plus, Trash2, Check, Circle, Calendar } from 'lucide-react';
import './App.css'; // We will define the styles next

function App() {
  const [input, setInput] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(addTodo(input));
    setInput('');
  };

  // Sort: Incomplete tasks first
  const sortedTodos = [...todos].sort((a, b) => 
    Number(a.completed) - Number(b.completed)
  );

  return (
    <div className="app-container">
      <div className="glass-card">
        <header className="header">
          <h1>My Tasks</h1>
          <p className="subtitle">{todos.length} tasks remaining</p>
        </header>

        <form onSubmit={handleSubmit} className="input-group">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="add-btn">
            <Plus size={24} />
          </button>
        </form>

        <div className="todo-list">
          {sortedTodos.length === 0 ? (
            <div className="empty-state">
              <Calendar size={48} opacity={0.5} />
              <p>No tasks yet. Add one above!</p>
            </div>
          ) : (
            sortedTodos.map((todo) => (
              <div 
                key={todo.id} 
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
              >
                <div 
                  className="todo-content" 
                  onClick={() => dispatch(toggleTodo(todo.id))}
                >
                  {todo.completed ? 
                    <div className="check-box checked"><Check size={14} /></div> : 
                    <div className="check-box"><Circle size={14} /></div>
                  }
                  <span className="todo-text">{todo.text}</span>
                </div>
                
                <button 
                  className="delete-btn"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;