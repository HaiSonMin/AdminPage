import { HeadingMD, HeadingSM } from '@/components/heading';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PiSuitcaseSimpleBold } from 'react-icons/pi';
import { MdMyLocation } from 'react-icons/md';
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
        <img
          src='https://klain.1office.vn/f/p/TDI0OHg4d045SHpkUkF0d2REV0NRQ1pCZlJnWFhlMlJrODd4TFhkb2JTVFphRDFpL3llNFg4WFI4dytibExGNUFSY1RuKzNIVC9KL0wzR2RwRFZvUkRsV3ZjOXFuWUgwUVk0NTlqN0dWWmZUTjI4TA/836792671656fe89761e31906404218.06.12.2023.small.png'
          alt='Avatar user'
        />
      </Avatar>
      <Info>
        <HeadingSM className='info-heading' $isBold={true}>
          NGUYỄN LÂM HẢI SƠN
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
