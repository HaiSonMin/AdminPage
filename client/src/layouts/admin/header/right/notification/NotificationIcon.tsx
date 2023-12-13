import { Icon } from '../Icon';
import { PopupNotification } from '@/components/popups/popup-notification';
import { useState } from 'react';
import { Overlay } from '@/components/popups';
import { PiBellSimpleRingingLight } from 'react-icons/pi';

export const NotificationIcon = () => {
  const [isDisplayPopup, setIsDisplayPopup] = useState<boolean>(false);

  const handlerDisplayPopup = () => setIsDisplayPopup(!isDisplayPopup);
  return (
    <Icon onClick={handlerDisplayPopup}>
      <Overlay $isDisplay={isDisplayPopup} />
      <PopupNotification isDisplay={isDisplayPopup} />
      <PiBellSimpleRingingLight />
    </Icon>
  );
};
