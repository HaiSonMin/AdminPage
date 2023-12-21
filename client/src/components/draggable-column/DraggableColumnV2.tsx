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
  max-height: 30rem;
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
    cursor: grab;
    cursor: -webkit-grab;

    &:hover {
      opacity: 0.6;
      border: 1px solid var(--color-grey-400);
    }
  }
`;

interface IProps {
  items: Array<IItemDrag>;
}

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

function Quote({ item, index }: { item: IItemDrag; index: number }) {
  const itemRef = useRef<HTMLParagraphElement | null>(null);
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        // if (snapshot.isDragging) {
        //   provided?.draggableProps?.style?.left =
        //     provided?.draggableProps?.style?.left -
        //     (viewportNode.offsetLeft - viewportNode.offsetWidth / 2);
        //   provided?.draggableProps?.style?.top =
        //     provided.draggableProps.style.top -
        //     (viewportNode.offsetTop - viewportNode.offsetHeight / 2);
        // }
        if (snapshot.isDragging) {
          const curPos = itemRef?.current?.getBoundingClientRect();
          // console.log(curPos);
          console.log(
            'provided?.draggableProps?.style:::',
            provided?.draggableProps?.style
          );
        }
        return (
          <Item
            $isMove={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              top: '-1000px !important',
              left: 'auto !important',
            }}
          >
            <p className='content' ref={itemRef}>
              {item.name}
            </p>
          </Item>
        );
      }}
    </Draggable>
  );
}

const QuoteList = React.memo(function QuoteList({
  items,
}: {
  items: IItemDrag[];
}) {
  return items.map((quote: IItemDrag, index: number) => (
    <Quote item={quote} index={index} key={quote.id} />
  ));
});

export function DraggableColumnV2({ items }: IProps) {
  const [state, setState] = useState({ items });

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(
      state.items,
      result.source.index,
      result.destination.index
    );

    setState({ items } as { items: IItemDrag[] });
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
            <QuoteList items={state.items} />
            {provided.placeholder}
          </ListItems>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
