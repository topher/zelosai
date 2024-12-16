// components/TaskCard.tsx
import React from 'react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface TaskCardProps {
  triple: Triple;
}

const TaskCard: React.FC<TaskCardProps> = ({ triple }) => {
  // Tasks representation would need to be determined
  return (
    <div className="task-card">
      <div className="title">{triple.subject}</div>
      {/* Tasks rendering logic here */}
    </div>
  );
};

export default TaskCard;
