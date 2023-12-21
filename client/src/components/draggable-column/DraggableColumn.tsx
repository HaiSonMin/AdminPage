import { randomId } from '@mantine/hooks';
import Draggable from 'react-draggable';
import styled from 'styled-components';

const ListItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border: 1px solid var(--color-grey-200);
  padding: 1rem;
`;

const Item = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 1rem;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  cursor: pointer;

  &:hover {
    opacity: 0.6;
    border: 1px solid var(--color-grey-400);
  }
`;

interface IProps {
  items: Array<string>;
}

export function DraggableColumn({ items }: IProps) {
  return (
    <ListItems>
      {items.map((item) => (
        <Draggable axis='both' grid={[5, 5]}>
          <Item key={randomId()}>{item}</Item>
        </Draggable>
      ))}
    </ListItems>
  );
}
