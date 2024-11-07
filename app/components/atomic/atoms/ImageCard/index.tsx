import React, { Fragment, memo } from 'react';
import styled, { css } from 'styled-components';

interface ImageCardProps {
  image?: string;
  onClick: () => void;
  cardTitle: string;
  leftTitle: string;
  textColor?: string;
  rightTitle: string;
  leftSubTitle?: string;
}

export const Image = styled.img`
  position: absolute;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 160px;
  border-radius: 10px;
`;

export const Backdrop = styled.div`
  width: 100%;
  height: 160px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  border-radius: 10px;
  z-index: 0;
`;

export const Container = styled.div<{ bgImage?: string }>`
  border-radius: 10px;
  display: flex;
  padding: 20px;
  width: 100%;
  height: 180px;
  box-sizing: border-box;
  float: left;
  flex-direction: column;
  text-align: center;
  cursor: pointer;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
  ${({ bgImage }) => {
    if (bgImage) {
      return css`background-image: url(${bgImage});`;
    }
    return css`background: linear-gradient(96.83deg, rgba(234, 239, 253, 0.5) 0%, rgba(141, 163, 204, 0.5) 100%)`;
  }}
`;

export const Heading = styled.div<{ textColor?: string }>`
  font: bold 20px Rubik;
  align-items: center;
  justify-content: center;
  height: inherit;
  color: ${({ textColor }) => (textColor ? textColor : '#000')}; // Default to black if not provided
  display: flex;
  overflow: hidden;
  z-index: 1;
`;

export const FooterTitle = styled.div<{ textColor?: string }>`
  font: bold 15px Rubik;
  width: 100%;
  text-align: left;
  display: flex;
  font-style: italic;
  flex: 1;
  justify-content: space-between;
  color: ${({ textColor }) => (textColor ? textColor : '#000')}; // Default to black if not provided
  z-index: 1;
  flex-direction: column;
  div {
    &:first-child {
      max-width: 95%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:last-child {
      font: bold 13px Rubik;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const ImageCard: React.FC<ImageCardProps> = memo(
  ({ image, onClick, cardTitle, leftTitle, textColor, rightTitle, leftSubTitle }) => {
    // Use a default placeholder image if `image` is not provided
    const placeholderImage = '/path/to/placeholder-image.png';
    const displayImage = image || placeholderImage;

    return (
      <Container bgImage={displayImage} onClick={onClick}>
        {displayImage && (
          <Fragment>
            <Image src={displayImage} alt={cardTitle} onError={(e) => (e.currentTarget.src = placeholderImage)} />
            <Backdrop />
          </Fragment>
        )}
        <Heading textColor={textColor}>{cardTitle}</Heading>
        <FooterTitle textColor={textColor}>
          <div>
            <div title={leftTitle}>{leftTitle}</div>
            <div>{leftSubTitle}</div>
          </div>
          <div>
            <div>{rightTitle}</div>
          </div>
        </FooterTitle>
      </Container>
    );
  }
);

export default ImageCard;
