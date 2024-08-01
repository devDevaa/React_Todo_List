import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import CheckAllandRemaining from './components/CheckAllandRemaining.js';
import TodoFilter from './components/TodoFilter.js';
import ClearComplete from './components/ClearComplete.js';
import { useCallback, useEffect, useState } from 'react';


function App() {

  let [todos, setTodos] = useState([]);
  let [filterTodos, setFilterTodos] = useState(todos);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res=>res.json())
      .then((json) => {
        setTodos(json)
        setFilterTodos(json)
      })
  }, []);

  let addTodo = (todo) => {
    //update at server side
    fetch('http://localhost:3001/todos', {
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(todo)
    })
    //update at client side
    setTodos(prevState => [...prevState, todo]);
  }

  let deleteTodo = (todoId) => {
    //delete at server side
    fetch(`http://localhost:3001/todos/${todoId}`, {
      method: 'DELETE',
    });
    console.log("deleted");
    //delete at client side
    setTodos(prevState => {
      return prevState.filter(todo => {
        return todo.id !== todoId
      });
    })
  }


  let updateTodo = (todo) => {
    // update server side
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method : "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(todo)
    })
    // update client side
    setTodos(prevState => {
      return prevState.map(t => {
        if(t.id === todo.id) {
          return todo
        }
        return t;
      });
    })
  }

  let checkAll = () => {
    // server side
    todos.forEach(t => {
      t.completed = true;
      updateTodo(t)
    })
    // client side
    setTodos((prevState) => {
      return prevState.map(t => {
        return {...t, completed : true};
      })
    })
  }

  let ClearCompleted = () => {
    // server side
    todos.forEach(t => {
      if(t.completed) {
        deleteTodo(t.id)
      }
    })
    //client side
    setTodos((prevState) => {
      return prevState.filter(t => !t.completed)
    })
  }

  let filterBy = useCallback((filter) => {
    if(filter == "All") {
      setFilterTodos(todos)
    }
    if(filter == "Active") {
      setFilterTodos(todos.filter(t => !t.completed))
    }
    if(filter == "Completed") {
      setFilterTodos(todos.filter(t => t.completed))
    }
  }, [todos]);

  let remainingCount = todos.filter(t => !t.completed).length;

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        {/* Todo Form */}
        <TodoForm addTodo = {addTodo} />

        {/* Todo List */}
        <TodoList todos = {filterTodos} deleteTodo = {deleteTodo} updateTodo = {updateTodo} />

        {/* CheckAllandRemaining */}
        <CheckAllandRemaining remainingCount = {remainingCount} checkAll = {checkAll} />

        <div className="other-buttons-container">
          {/* Todo Filter */}
          <TodoFilter filterBy = {filterBy} />

          {/* Clear Complete */}
          <ClearComplete ClearCompleted = {ClearCompleted}/>          
        </div>

      </div>
    </div>
  );
}

export default App;
