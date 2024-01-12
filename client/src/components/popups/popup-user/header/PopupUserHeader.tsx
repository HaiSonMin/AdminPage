import { HeadingMD, HeadingSM } from '@/components/heading';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PiSuitcaseSimpleBold } from 'react-icons/pi';
import { MdMyLocation } from 'react-icons/md';
import { IDataLocalUser } from '@/interfaces/common';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import IconTemp from '@/assets/images/image-logo/logo_seadragon_w127-h127.webp';

const PopupUserHeaderStyle = styled.div`
  padding: 3rem 2rem 2.4rem;
  display: flex;
  align-items: center;
  gap: 1.8rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const Avatar = styled(Link)`
  display: inline-block;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 1px solid var(--color-primary);
  overflow: hidden;
  position: relative;

  img {
    border-radius: 50%;
    scale: 0.94;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    transition: all 0.3s;
    &:hover {
      scale: 1.05;
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  svg {
    color: var(--color-text-secondary);
  }

  .info-heading {
    text-transform: uppercase;
    color: var(--color-primary);
    line-height: 1;
  }

  .info-part,
  .info-position {
    display: flex;
    align-items: center;
    font-weight: 500;
    color: var(--color-text-secondary);
    gap: 2px;
    line-height: 1;
  }
`;

export const PopupUserHeader = () => {
  return (
    <PopupUserHeaderStyle>
      <Avatar to={''}>
        <img src={`${IconTemp}`} alt='Avatar user' />
      </Avatar>
      <Info>
        <HeadingSM className='info-heading' $isBold={true}>
          {`${
            (
              JSON.parse(
                `${localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER)}`
              ) as IDataLocalUser
            ).employee_fullName
          }`.toUpperCase()}
        </HeadingSM>
        <p className='info-part'>
          <PiSuitcaseSimpleBold /> R&D
        </p>
        <p className='info-position'>
          <MdMyLocation />
          Developer
        </p>
      </Info>
    </PopupUserHeaderStyle>
  );
};
