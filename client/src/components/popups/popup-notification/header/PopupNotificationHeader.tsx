import styled from 'styled-components';

const PopupNotificationHeaderStyle = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-grey-300);
  padding: 0 1.2rem;
  gap: 1.5rem;
  .tab {
    color: var(--color-text-secondary);
    font-size: var(--font-size-12);
    font-weight: 500;
    line-height: 1;
    padding: 1.5rem 0;
    cursor: pointer;

    &:hover {
      color: var(--color-primary);
    }
  }

  .tab.active {
    border-bottom: 2px solid var(--color-primary);
    color: var(--color-primary);
  }
`;

export const PopupNotificationHeader = () => {
  return (
    <PopupNotificationHeaderStyle>
      <p className='tab active'>Công việc (123)</p>
      <p className='tab'>Đã duyệt (90)</p>
      <p className='tab'>Tất cả (410)</p>
    </PopupNotificationHeaderStyle>
  );
};
