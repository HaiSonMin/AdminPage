import styled from 'styled-components';

const ImageStyle = styled.div<{ $width: string; $height: string }>`
  overflow: hidden;
  width: ${(props) => `${props.$width}rem`};
  height: ${(props) => `${props.$height}rem`};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
`;

interface IProps {
  imageSrc: string;
  imageAlt: string;
  width: string;
  height: string;
}

export const Image = ({ imageSrc, imageAlt, width, height }: IProps) => {
  return (
    <ImageStyle $width={width} $height={height}>
      <img src={imageSrc} alt={imageAlt} />
    </ImageStyle>
  );
};
