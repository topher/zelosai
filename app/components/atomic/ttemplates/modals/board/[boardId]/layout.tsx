'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

  if (!boardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board">
      {boardData.lists.map((list, index) => (
        <div key={index} className="list-container">
          <div className="list-title">{list.title}</div>
          {list.cards.map((card, cardIndex) => (
            <div key={cardIndex} className="card">
              {card.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardIdPage;
