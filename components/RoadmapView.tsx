// RoadmapView.tsx
'use client';
import React, { useState, useEffect } from 'react';
import TaskCard from '@/components/TaskCard';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  progress: number;
  dueDate: string;
}

const RoadmapView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between">
        {/* Dynamic generation of months or other time periods */}
        <div className="text-sm font-medium text-gray-500">Feb</div>
        <div className="text-sm font-medium text-gray-500">Mar</div>
        {/* ... other months */}
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Map over tasks and render them */}
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default RoadmapView;
