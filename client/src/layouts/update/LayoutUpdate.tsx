import styled from 'styled-components';
import ImageUpdate from '@/assets/images/image-icon/update.png';

const LayoutUpdateStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgUpdateStyle = styled.img`
  width: 25rem;
  height: 25rem;
`;

export const LayoutUpdate = () => {
  return (
    <LayoutUpdateStyle>
      <ImgUpdateStyle src={ImageUpdate} alt='Image Update Feature' />
    </LayoutUpdateStyle>
  );
};
