import styled from 'styled-components';

const PopupNotificationFooterStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 1.5rem 0;
  transition: all 0.3s;
  color: var(--color-text-secondary);
  line-height: 1;
  cursor: pointer;
  /* border-top: 1px solid var(--color-grey-300); */
  &:hover {
    color: var(--color-primary);
  }
`;

export const PopupNotificationFooter = () => {
  return (
    <PopupNotificationFooterStyle>Xem tất cả</PopupNotificationFooterStyle>
  );
};
