import React from 'react';

const Stages = ({
  data,
  handler,
  handleDragStart,
  handleDragEnter,
  handleDragDrop,
}) => {
  const stages = [
    {
      stageId: 1,
      stageLabel: 'Backlog',
    },
    {
      stageId: 2,
      stageLabel: 'To Do',
    },
    {
      stageId: 3,
      stageLabel: 'In Progress',
    },
    {
      stageId: 4,
      stageLabel: 'Done',
    },
  ];
  const getTodo = (id) => {
    handler(id);
  };
  return (
    <>
      <div className="container">
        <h3 className="text-center text-danger py-3">Stages</h3>
        <h5 className="m-0 text-center">
          Note : After Saving Task Click or Drag Task Item To Change State
        </h5>
        <div className="mt-4">
          <ul className="list-unstyled text-center stage-list">
            {stages?.map((stage, index) => {
              const { stageId, stageLabel } = stage;
              return (
                <li key={`stage-${stageId}`} className={`stage-list__item`}>
                  <h4>{stageLabel}</h4>
                  <ul
                    className="list-unstyled innerList pt-1 h-100"
                    onDragEnter={(e) => handleDragEnter(e, '', stageId)}
                    onTouchMove={(e) => {
                      console.log('Touch In Ul', stageId);
                      handleDragEnter(e, '', stageId);
                    }}
                  >
                    {data?.map((task) => {
                      const { taskId, taskLabel, taskStage } = task;
                      if (taskStage !== stageId) return false;
                      return (
                        <li
                          key={`task-${taskId}`}
                          className="mt-2"
                          onClick={() => getTodo(taskId)}
                          onDragStart={(e) =>
                            handleDragStart(e, taskId, stageId)
                          }
                          onDragEnter={(e) =>
                            handleDragEnter(e, taskId, stageId)
                          }
                          onDragEnd={handleDragDrop}
                          // touch events
                          onTouchStart={(e) => {
                            handleDragStart(e, taskId, stageId);
                          }}
                          onTouchMove={(e) => {
                            handleDragEnter(e, taskId, stageId);
                          }}
                          onTouchEnd={handleDragDrop}
                          draggable
                        >
                          <button
                            className={`text-break shadow w-75 btn btn-${
                              taskStage == 1
                                ? 'danger'
                                : taskStage == 2
                                ? 'warning'
                                : taskStage == 3
                                ? 'info'
                                : 'success'
                            } p-4 rounded`}
                          >
                            {taskLabel}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Stages;
