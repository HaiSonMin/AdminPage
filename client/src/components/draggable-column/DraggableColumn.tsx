import { IItemDrag } from '@/interfaces/common';
import React, { useEffect, useRef, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProps,
  DropResult,
} from 'react-beautiful-dnd';
import styled from 'styled-components';

const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border: 1px solid var(--color-grey-200);
  padding: 1rem;
  height: 30rem;
  overflow-y: auto;
`;

const Item = styled.div<{ $isMove: boolean }>`
  .content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 1rem;
    background-color: ${(props) =>
      props.$isMove ? 'var(--color-primary-light)' : 'var(--color-grey-100)'};
    border: 1px solid var(--color-grey-200);
    border-radius: var(--border-radius-sm);
    cursor: pointer;

    &:hover {
      opacity: 0.6;
      border: 1px solid var(--color-grey-400);
    }
  }
`;

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

const reorder = (list: IItemDrag[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Quote({
  item,
  index,
  handleToggleField,
}: {
  item: IItemDrag;
  index: number;
  handleToggleField: (index: number) => void;
}) {
  const itemRef = useRef<HTMLParagraphElement | null>(null);
  return (
    <Draggable draggableId={item.fieldKey} index={index}>
      {(provided, snapshot) => {
        return (
          <Item
            $isMove={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              top: 'auto !important',
              left: 'auto !important',
            }}
          >
            <p
              className='content'
              ref={itemRef}
              onClick={() => handleToggleField(index)}
            >
              {item.fieldName}
            </p>
          </Item>
        );
      }}
    </Draggable>
  );
}

const QuoteList = React.memo(function QuoteList({
  items,
  handleToggleField,
}: {
  items: IItemDrag[];
  handleToggleField: (index: number) => void;
}) {
  return items.map((quote: IItemDrag, index: number) => (
    <Quote
      item={quote}
      index={index}
      key={quote.fieldKey}
      handleToggleField={handleToggleField}
    />
  ));
});

interface IProps {
  items: Array<IItemDrag>;
  setItems: (items: IItemDrag[]) => void;
  handleToggleField: (index: number) => void;
}

export function DraggableColumn({
  items,
  setItems,
  handleToggleField,
}: IProps) {
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const itemsUpdate = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(itemsUpdate);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable
        droppableId='ROOT'
        direction='vertical'
        mode='standard'
        type='group'
      >
        {(provided) => (
          <ListItems ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList items={items} handleToggleField={handleToggleField} />
            {provided.placeholder}
          </ListItems>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
