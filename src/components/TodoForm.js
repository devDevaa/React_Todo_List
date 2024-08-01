import React, { useState } from 'react'

export default function TodoForm({addTodo}) {

  let [title, setTitle] = useState("");

  let handleSubmit = (e) => {
    // prevent default nature of the form refresh
    e.preventDefault();
    // add todo
    let todo = {
      id : `${Math.random()}`,
      title : title,
      completed : false
    }
    addTodo(todo)
    // clear form
    setTitle('')
  }

  return (
    <form action="#" onSubmit={handleSubmit} >
        <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        value={title}
        // catch form input
        onChange={(e) => setTitle(e.target.value)}
        />
    </form>
  )
}
