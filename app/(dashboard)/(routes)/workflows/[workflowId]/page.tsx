'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ListContainer } from './components/list-container';
import { Board, Workflow, Task, WorkflowStage } from '@/app/types';

interface BoardIdPageProps {
  params: {
    workflowId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  const router = useRouter();
  const { workflowId } = params;
  const [boardData, setBoardData] = useState<Board | null>(null);

  const fetchBoardData = async () => {
    try {
      console.log("😜😜 😜 😜 😜 😜  params", workflowId, params)
      const workflowResponse = await fetch(`/api/resource/workflows/${workflowId}`);
  
      if (workflowResponse.ok) {
        const workflow: Workflow = await workflowResponse.json();
        
        // Fetch tasks associated with the workflow
        const tasksResponse = await fetch(`/api/resource/tasks?workflowId=${workflow.id}`);
        
        if (!tasksResponse.ok) {
          throw new Error(`Failed to fetch tasks: ${tasksResponse.status} ${tasksResponse.statusText}`);
        }
        
        const tasksData = await tasksResponse.json();
        console.log("😜 workflow tasks", tasksData)
        
        // Ensure that 'resources' exists and is an array
        if (!tasksData.resources || !Array.isArray(tasksData.resources)) {
          throw new Error('Invalid tasks data format: "resources" is missing or not an array.');
        }
  
        const tasks: Task[] = tasksData.resources;
  
        // Group tasks by stageId
        const tasksByStageId: { [key: string]: Task[] } = {};
        tasks.forEach((task) => {
          const stageId = task.stageId || 'unassigned';
          if (!tasksByStageId[stageId]) {
            tasksByStageId[stageId] = [];
          }
          tasksByStageId[stageId].push(task);
        });
  
        // Map WorkflowStages to Lists and Tasks to Cards
        const lists = workflow.stages.map((stage, index) => ({
          id: stage.id,
          boardId: workflow.id,
          title: stage.name,
          order: index,
          cards:
            tasksByStageId[stage.id]?.map((task, cardIndex) => ({
              id: task.id,
              listId: stage.id,
              title: task.title,
              order: cardIndex,
              // Include other properties as needed
            })) || [],
        }));
  
        // Include unassigned tasks
        if (tasksByStageId['unassigned']) {
          lists.push({
            id: 'unassigned',
            boardId: workflow.id,
            title: 'Backlog',
            order: workflow.stages.length,
            cards: tasksByStageId['unassigned'].map((task, cardIndex) => ({
              id: task.id,
              listId: 'unassigned',
              title: task.title,
              order: cardIndex,
              // Include other properties as needed
            })),
          });
        }
  
        const boardData: Board = {
          id: workflow.id,
          name: workflow.name,
          lists,
        };
  
        setBoardData(boardData);
      } else {
        console.error('Error fetching board data: Workflow not found.');
        // Optionally, redirect the user or set an error state
        // router.push('/workflows/library');
      }
    } catch (error: any) {
      console.error('Error fetching board data:', error);
      // Optionally, redirect the user or handle the error as needed
      // router.push('/workflows/library');
    }
  };
  
  useEffect(() => {
    fetchBoardData();
  }, [workflowId, router]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return; // Dropped outside the list
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return; // Dropped in the same place
    }

    // Update the task's stageId
    const taskId = draggableId;
    const destinationStageId = destination.droppableId;

    const updateTaskStage = async () => {
      try {
        await fetch(`/api/resource/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stageId: destinationStageId }),
        });

        // Re-fetch the board data to update the UI
        await fetchBoardData();
      } catch (error) {
        console.error('Error updating task stage:', error);
      }
    };

    updateTaskStage();
  };

  if (!boardData) {
    return <div>Loading...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer boardId={workflowId} data={boardData.lists} />
      </div>
    </DragDropContext>
  );
};

export default BoardIdPage;
