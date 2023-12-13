import styled from 'styled-components';
import UserIcon from '@/assets/images/user-icon.webp';
import { useState } from 'react';
import { Overlay } from '@/components/popups';
import { PopupUser } from '@/components/popups/popup-user';

const UserStyle = styled.div`
  position: relative;
  .box-avatar {
    width: 3.6rem;
    height: 3.6rem;
    cursor: pointer;
    overflow: hidden;
    border-radius: 999px;
    transition: all 0.3s;
    &:hover {
      box-shadow: var(--shadow-around);
    }

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
`;

export const User = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const onClick = () => setIsClicked(!isClicked);

  return (
    <UserStyle onClick={onClick}>
      <Overlay $isDisplay={isClicked} />
      <PopupUser isDisplay={isClicked} />
      <div className='box-avatar'>
        <img
          className='avatar'
          src='https://klain.1office.vn/f/p/TDI0OHg4d045SHpkUkF0d2REV0NRQ1pCZlJnWFhlMlJrODd4TFhkb2JTVFphRDFpL3llNFg4WFI4dytibExGNUFSY1RuKzNIVC9KL0wzR2RwRFZvUkRsV3ZjOXFuWUgwUVk0NTlqN0dWWmZUTjI4TA/836792671656fe89761e31906404218.06.12.2023.small.png'
          alt='User Icon'
        />
      </div>
    </UserStyle>
  );
};
