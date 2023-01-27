import React from 'react';
import { useState } from 'react';

const Controls = ({ data, addToDo, moveTodoId, handleTodoStage }) => {
  console.log(moveTodoId);
  const moveTodo = data.filter((each) => {
    return each.taskId === moveTodoId;
  });

  const [todo, setTodo] = useState({
    taskStage: 1,
    label: '',
  });

  const handleTodo = (e) => {
    setTodo({
      taskStage: 1,
      label: e.target.value,
    });
  };

  const handleSaveTodo = () => {
    addToDo(todo);
    setTodo({
      taskStage: 1,
      label: '',
    });
  };

  return (
    <>
      <div className="container controls">
        <h3 className="text-center py-3 text-danger">Controls</h3>
        <div className="py-3">
          <div className="form-group pb-3 d-flex flex-column align-items-center">
            <input
              type="text"
              value={todo.label}
              onChange={handleTodo}
              name="task-label"
              className="w-100 form-control"
              placeholder="Enter Task Name"
            />
            <button
              className="mt-3 px-5 btn btn-primary"
              disabled={todo.label.length === 0 ? true : false}
              onClick={handleSaveTodo}
            >
              Save Task
            </button>
          </div>
          {moveTodoId !== null && (
            <div className="form-group mb-3 d-flex flex-column">
              <input
                type="text"
                name="task-label"
                value={moveTodo[0].taskLabel}
                className="w-100 form-control"
                readOnly
              />
              <button
                className="mt-3 btn btn-info"
                disabled={moveTodo[0].taskStage == 1 && true}
                onClick={() => handleTodoStage(moveTodo[0], -1)}
              >
                Move Backward
              </button>
              <button
                className="mt-3 btn btn-warning"
                disabled={moveTodo[0].taskStage == 4 && true}
                onClick={() => handleTodoStage(moveTodo[0], 1)}
              >
                Move Forward
              </button>
              <button
                className="mt-3 btn btn-danger"
                onClick={() => handleTodoStage(moveTodo[0], 'delete')}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Controls;
