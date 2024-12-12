// /app/(dashboard)/(routes)/workflows/[workflowId]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { ListContainer } from './components/list-container';
import { Board, Workflow, Task } from '@/app/types';
import KanbanLayout from '@/app/components/atomic/templates/KanbanLayout';

interface BoardIdPageProps {
  params: {
    workflowId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  const router = useRouter();
  const { workflowId } = params;
  const [boardData, setBoardData] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const workflowResponse = await fetch(`/api/resource/workflows/${workflowId}`);
  
      if (workflowResponse.ok) {
        const workflow: Workflow = await workflowResponse.json();
        
        const tasksResponse = await fetch(`/api/resource/tasks?workflowId=${workflow.id}`);
        
        if (!tasksResponse.ok) {
          throw new Error(`Failed to fetch tasks: ${tasksResponse.status} ${tasksResponse.statusText}`);
        }
        
        const tasksData = await tasksResponse.json();
        
        if (!tasksData.resources || !Array.isArray(tasksData.resources)) {
          throw new Error('Invalid tasks data format: "resources" is missing or not an array.');
        }
  
        const tasks: Task[] = tasksData.resources;
  
        const tasksByStageId: { [key: string]: Task[] } = {};
        tasks.forEach((task) => {
          const stageId = task.stageId || 'unassigned';
          if (!tasksByStageId[stageId]) {
            tasksByStageId[stageId] = [];
          }
          tasksByStageId[stageId].push(task);
        });
  
        const lists = (workflow.stages || []).map((stage, index) => ({
          id: stage.id,
          boardId: workflow.id,
          title: stage.name,
          order: index,
          cards:
            tasksByStageId[stage.id]?.map((task, cardIndex) => ({
              id: String(task.id),
              listId: String(stage.id),
              title: task.title,
              order: cardIndex,
            })) || [],
        }));
  
        if (tasksByStageId['unassigned']) {
          lists.push({
            id: 'unassigned',
            boardId: workflow.id,
            title: 'Backlog',
            order: workflow.stages.length,
            cards: tasksByStageId['unassigned'].map((task, cardIndex) => ({
              id: String(task.id),
              listId: 'unassigned',
              title: task.title,
              order: cardIndex,
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
        setError('Workflow not found.');
      }
    } catch (error: any) {
      console.error('Error fetching board data:', error);
      setError(error.message || 'Error fetching board data.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBoardData();
  }, [workflowId, router]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

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
        await fetchBoardData();
      } catch (error) {
        console.error('Error updating task stage:', error);
      }
    };

    updateTaskStage();
  };

  return (
    <KanbanLayout
      header={{
        title: boardData?.name || 'Loading...',
        description: "Manage your workflow's tasks using this Kanban board.",
      }}
      isLoading={isLoading}
      error={error}
    >
      {boardData && (
        <DragDropContext onDragEnd={onDragEnd}>
          <ListContainer boardId={workflowId} data={boardData.lists} />
        </DragDropContext>
      )}
    </KanbanLayout>
  );
};

export default BoardIdPage;
