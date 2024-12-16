'use client'
import React from 'react';

interface TaskCardProps {
    title: string;
    progress: number;
    dueDate: string;
  }
  
  const TaskCard: React.FC<TaskCardProps> = ({ title, progress, dueDate }) => {
    return (
      <div className="task-card">
        <h3>{title}</h3>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="due-date">
          {new Date(dueDate).toLocaleDateString()}
        </div>
      </div>
    );
  };
  
  export default TaskCard;
  