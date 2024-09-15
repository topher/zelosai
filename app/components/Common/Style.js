import styled, { css } from 'styled-components';

import colors from './Colors';
import { above, below } from './Sizes';
import { grid } from '../../util/Constants';
import { Button as StyledButton } from '../Button/ButtonStyle';

export const Flexbox = styled.div`
    display: flex;
    flex: ${ props => props.fill ? props.fill : 0 };
    flex-direction: ${ props => {
        if(props.direction) {
            return props.direction;
        }
        return 'inherit';
    }};
    width: 100%;
`;

export const ExpandFull = styled.div`
    width: 100%;
    height: 100%;
`;

export const ExpandFullWidth = styled.div`
    width: 100%;
`;

export const PageContainer = styled.div`
    height: 100vh;
    padding: 24px 54px 0 21px;
    box-sizing: border-box;
    ${above.iPhoneL`
        padding: 35px 21px 0 21px;
    `};
`;

export const TextCenter = styled.div`
    text-align:     center;
    width:          100%;
`;

export const TextRight = styled.div`
    text-align:     right;
    width:          100%;
`;

export const Uppercase = styled.span`
    text-transform: uppercase;
`;

export const Padding = styled.div`
    padding: ${({ size }) => size};
`;

export const VGutter = styled.div`
    height:         ${({ space }) => `${space}px`};
`;

export const SizedBox = styled.div`
    min-height:     ${({ height }) => height && `${height}px`};
    min-width:      ${({ width }) => width && `${width}px`};
`;

export const HGutter = styled.span`
    display:            inline-block;
    min-width:         ${({ space }) => `${space}px`};
`;

export const VCenter = styled(Flexbox)`
    align-items: center;
`;

export const HCenter = styled(Flexbox)`
    justify-content: center;
`;

export const Color = styled.span`
    color: ${props => props.code ? props.code : '#011627'};
`;

export const SpaceBetween = styled(Flexbox)`
    justify-content: space-between;
`;

export const Relative = styled.div`
    position: relative;
    height: auto;
`;

export const Bold = styled.span`
    font-weight: bold;
`;

export const Italic = styled.span`
    font-style: italic;
`;

export const OnlyBorderBottomInput = styled.input`
    background: transparent;
    padding: 5px;
    height: 30px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: 'Roboto Mono';
    border: none;
    border-bottom: 2px solid #2A4494;

    &:focus {
        outline: none;
    }
`;

export const Pointer = styled.span`
  cursor: pointer;
`;

export const EllipsisIcon = styled.img`
    cursor: pointer;
    width: ${ grid.ELLIPSIS_ICON_WIDTH }px;
`;

export const Capitalize = styled.span`
    text-transform:     capitalize;
`;

export const EllipsisContainer = styled.div`
  position: absolute;
  min-width: 40px;
  min-height: 24px;
  top: ${props => {
    switch(props.position) {
      case 'topLeft':
      case 'topRight':
        return '-3px';

      default:
        return 'inherit'

    }
  }};

  right: ${props => {
    switch(props.position) {
      case 'bottomRight':
      case 'topRight':
        return '-3px';

      default:
        return 'inherit'

    }
  }};

  left: ${props => {
    switch(props.position) {
      case 'bottomLeft':
      case 'topLeft':
        return 0;

      default:
        return 'inherit'

    }
  }};

  bottom: ${props => {
    switch(props.position) {
      case 'bottomLeft':
      case 'bottomRight':
        return 0;

      default:
        return 'inherit'

    }
  }};
`;

export const EllipsisDefaultIcon = styled(EllipsisIcon)`
    display: none;
`;

export const EllipsisSelectedIcon = styled(EllipsisIcon)`
    position: absolute;
    top: 0;
`;

export const Content = styled.div`
    background: #fff;
    height: calc(100vh - 239px);
    padding: 0 15px 0 15px;
    border-radius: 10px;
    display: ${({hide}) => hide && 'none'};
    ${above.iPhoneL`
        height: calc(100vh - 250px);
    `};
    ${above.iPadS`
        height: calc(100vh - 165px);
    `};
    ${above.iPadL`
        height: calc(100vh - 250px);
    `}
`;

export const Header = styled(Flexbox)`
    height: 205px;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    ${above.iPhoneL`
        height: 169px;
    `};
    ${above.iPadL`
        height: 205px;
    `};
    ${below.iPadS`
        height: 205px;
    `};
`;

export const RadioButton = styled.input`
    min-width: 22px;
    min-height: 22px;
    margin: 0 10px 0 0;
    background: #fff;
    border-radius: 50%;
    vertical-align: middle;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border: none;
    &:checked {
        background-color: ${colors.primary};
    }
`;

export const Button = styled(StyledButton)`
    background: ${props => props.primary ? '#2A4494' : '#fff' };
    font-weight: bold;
    text-transform: lowercase;
    font-size: 14px;
    width: 65px;
    align-self: flex-end;
    margin-top: 3px;
    cursor: pointer;
    z-index: 999;
    &:focus {
        outline: none;
    }
`;

export const Margin = css`
    margin-top: ${({ top }) => `${top}px`};
`;

export const Superscript = styled.sub`
    color: #011627;
    font-size: 14px;
    line-height: .8;
    font-family: inherit;
    font-weight: inherit;
`;

export const Column = styled(Flexbox)`
    flex-direction: column;
`;

export const Row = styled(Flexbox)`
    flex-direction: row;
`;

export const FlexWrap = styled(Flexbox)`
    flex-wrap:      wrap;
    flex-direction: row;
`;

export const MultiLineEllipsis = styled.div`
    display:            -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow:           hidden;
    text-overflow:      ellipsis;
    width:              100%;
    height:             100%;
`;