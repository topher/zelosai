'use client';

import { Droppable } from "react-beautiful-dnd";
import { CardItem } from './card-item';
import { List } from '@/app/types';

interface ListContainerProps {
  boardId: string;
  data: List[];
};

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <div className="board">
      {data.map((list, listIndex) => (
        <div key={list.id} className="list-container">
          <div className="list-title">{list.title}</div>
          <Droppable droppableId={list.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="list-cards"
              >
                {list.cards.map((card, cardIndex) => (
                  <CardItem key={card.id} data={card} index={cardIndex} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  );
};
