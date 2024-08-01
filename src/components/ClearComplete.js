import React from 'react'

export default function ClearComplete({ClearCompleted}) {
  return (
    <div>
        <button className="button" onClick={ClearCompleted}>Clear Completed</button>
    </div>
  )
}
