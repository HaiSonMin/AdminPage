import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PopupMessageFooterStyle = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1.5rem;
  line-height: 1;
  border-top: 1px solid var(--color-grey-200);
  font-weight: 500;
  font-size: var(--font-size-14);
  color: var(--color-primary) !important;
  text-transform: uppercase;
`;

export const PopupMessageFooter = () => {
  return <PopupMessageFooterStyle to={''}>Xem tất cả</PopupMessageFooterStyle>;
};
