import styled, { css } from 'styled-components';
import IconNoNoti from '@/assets/images/image-icon/no-noti.webp';
import { ItemNotification } from './item-notification';
const PopupNotificationBodyStyle = styled.ul<{ $isHaveNotification: boolean }>`
  ${(props) =>
    !props.$isHaveNotification
      ? css`
          align-items: center;
          justify-content: center;
        `
      : css``}
  overflow-y: auto;
  flex-grow: 1;
`;

const BoxItemNoti = styled.ul`
  display: flex;
  flex-direction: column;
`;

const BoxImage = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 10rem;

  img {
    width: 100%;
    object-fit: contain;
    object-position: center;
  }
`;

export const PopupNotificationBody = () => {
  const testIsHaveNoti = true;
  return (
    <PopupNotificationBodyStyle $isHaveNotification={testIsHaveNoti}>
      {testIsHaveNoti ? (
        <BoxItemNoti>
          <ItemNotification />
          <ItemNotification />
        </BoxItemNoti>
      ) : (
        <BoxImage>
          <img src={IconNoNoti} alt='Icon No Notification' />
        </BoxImage>
      )}
    </PopupNotificationBodyStyle>
  );
};
