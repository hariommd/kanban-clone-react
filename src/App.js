import React from 'react';
import './style.css';
import { useState, useRef } from 'react';
import Controls from './components/controls/Controls';
import Stages from './components/stages/Stages';

export default function App() {
  const [data, setData] = useState([]);

  const [targetTodoId, setTargetTodoId] = useState(null);

  const addTodo = (todo) => {
    setData([
      ...data,
      { taskId: data.length, taskLabel: todo.label, taskStage: todo.taskStage },
    ]);
  };

  const getTodo = (id) => {
    setTargetTodoId(id);
  };

  // drag and drop functionality

  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleDragStart = (e, taskId, stageId) => {
    dragItem.current = taskId;
    console.log('Drag Start ===>', dragItem, taskId, stageId);
  };

  const handleDragEnter = (e, taskId, stageId) => {
    dragOverItem.current = stageId;
    console.log('Drag Over ===>', dragOverItem, taskId, stageId);
  };

  const handleDragDrop = () => {
    console.log('Drag End ===>', dragItem.current, dragOverItem.current);
    setData((data) => {
      return data.map((each) => {
        if (each.taskId !== dragItem.current) return each;
        return { ...each, taskStage: dragOverItem.current };
      });
    });
  };

  const handleTodoStage = (todo, movement) => {
    setData((data) => {
      if (movement !== 'delete') {
        return data.map((each) => {
          if (each.taskId !== todo.taskId) return each;
          if (movement == -1) {
            return { ...each, taskStage: each.taskStage - 1 };
          } else if (movement == 1) {
            return { ...each, taskStage: each.taskStage + 1 };
          }
        });
      } else {
        setTargetTodoId(null);
        return data.filter((each) => {
          return each.taskId !== todo.taskId;
        });
      }
    });
  };
  return (
    <div>
      <h1 className="text-center">Kanban Board Clone</h1>
      <main>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-12 col-md-3">
              <Controls
                data={data}
                addToDo={addTodo}
                moveTodoId={targetTodoId}
                handleTodoStage={handleTodoStage}
              />
            </div>
            <div className="col-12 col-md-9">
              <Stages
                data={data}
                handler={getTodo}
                handleDragStart={handleDragStart}
                handleDragEnter={handleDragEnter}
                handleDragDrop={handleDragDrop}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
