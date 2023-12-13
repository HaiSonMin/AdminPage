import { Icon } from '../Icon';
import { PopupMessage } from '@/components/popups/popup-message';
import { useState } from 'react';
import { Overlay } from '@/components/popups';
import { TbMessages } from 'react-icons/tb';

export const MessageIcon = () => {
  const [isDisplayPopup, setIsDisplayPopup] = useState<boolean>(false);

  const handlerDisplayPopup = () => setIsDisplayPopup(!isDisplayPopup);
  return (
    <Icon onClick={handlerDisplayPopup}>
      <Overlay $isDisplay={isDisplayPopup} />
      <PopupMessage isDisplay={isDisplayPopup} />
      <TbMessages />
    </Icon>
  );
};
