import styled from 'styled-components';
import IconTemp from '@/assets/images/image-logo/logo_seadragon_noname_w64-h64.webp';
import { useState } from 'react';
import { Overlay } from '@/components/popups';
import { PopupUser } from '@/components/popups/popup-user';

const UserFeatureStyle = styled.div`
  position: relative;
  .box-avatar {
    width: 3.8rem;
    height: 3.8rem;
    cursor: pointer;
    overflow: hidden;
    border-radius: 999px;
    transition: all 0.3s;
    box-shadow: var(--shadow-around);

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
      object-position: center;
    }
  }
`;

export const UserFeature = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const onClick = () => setIsClicked(!isClicked);

  return (
    <UserFeatureStyle onClick={onClick}>
      <Overlay $isDisplay={isClicked} />
      <PopupUser isDisplay={isClicked} />
      <div className='box-avatar'>
        <img className='avatar' src={`${IconTemp}`} alt='User Icon' />
      </div>
    </UserFeatureStyle>
  );
};
