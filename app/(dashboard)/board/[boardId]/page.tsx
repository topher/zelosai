'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ListContainer } from './_components/list-container';
import { demoData } from '@/app/data';
import { Board } from '@/app/types';

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  const router = useRouter();
  const { boardId } = params;
  const [boardData, setBoardData] = useState<Board | null>(null);

  useEffect(() => {
    if (boardId === 'demo-board') {
      setBoardData(demoData);
    } else {
      router.push('/select-board'); // Redirect if the board ID is invalid
    }
  }, [boardId, router]);

  const onDragEnd = (result: DropResult) => {
    // Logic to handle drag and drop result
    // For simplicity, this example doesn't implement the logic.
  };

  if (!boardData) {
    return <div>Loading...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer boardId={boardId} data={boardData.lists} />
      </div>
    </DragDropContext>
  );
};

export default BoardIdPage;
