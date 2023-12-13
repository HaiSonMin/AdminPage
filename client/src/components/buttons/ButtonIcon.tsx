import styled from 'styled-components';

interface IProps {
  icon: React.ReactNode;
  onClick?: () => void;
  width?: number;
  height?: number;
  size?: number;
}

const ButtonIconStyle = styled.div`
  display: inline-block;
  border-radius: '4px';
  background-color: '#fff';
  font-size: var(--font-size-20);
  color: var(--color-text);
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

export const ButtonIcon = ({ icon, onClick, width, height, size }: IProps) => {
  return <ButtonIconStyle onClick={onClick}>{icon}</ButtonIconStyle>;
};
