import styled, { css } from 'styled-components';

import colors from '../Common/Colors';

export const Image = styled.img`
    position:           absolute;
    left:               0;
    z-index:            0;
    width:              100%;
    height:             160px;
    border-radius:      10px;
`;

export const Backdrop = styled.div`
    width:              100%;
    height:             160px;
    background:         rgba(0,0,0,.5);
    position:           absolute;
    left:               0;
    border-radius:      10px;
    z-index:            0;
}
`;

export const Container = styled.div`
    border-radius:      10px;
    display:            flex;
    padding:            20px;
    width:              100%;
    height:             180px;
    box-sizing:         border-box;
    float:              left;
    flex-direction:     column;
    text-align:         center;
    cursor:             pointer;
    margin-bottom:      15px;
    position:           relative;
    overflow:           hidden;
    ${({ bgImage })  => {
        if(bgImage) {
            return css`background-image: ${bgImage}`;
        }
        return css`background: linear-gradient(96.83deg, rgba(234, 239, 253, 0.5) 0%, rgba(141, 163, 204, 0.5) 100%)`;
    }}
`;

export const Heading = styled.div`
    font:               bold 20px Rubik;
    align-items:        center;
    justify-content:    center;
    height:             inherit;
    color:              ${({ textColor }) => textColor ? textColor : colors.primary};
    display:            flex;
    overflow:           hidden;
    z-index:            1;
`;

export const FooterTitle = styled.div`
    font:               bold 15px Rubik;
    width:              100%;
    text-align:         left;
    display:            flex;
    font-style:         italic;
    flex:               1;
    justify-content:    space-between;
    color:              ${({ textColor }) => textColor ? textColor : colors.primary};
    z-index:            1;
    flex-direction:     column;
    div {
        &:first-child {
            max-width:  95%;
            white-space: nowrap;
            overflow:   hidden;
            text-overflow: ellipsis;
        }
        &:last-child {
            font:       bold 13px Rubik;
            white-space: nowrap;
            overflow:   hidden;
            text-overflow: ellipsis;
        }
    }
`;

export const Content = styled.div`
    display:            flex;
    align-items:        center;
    flex:               1;
    height:             100%;
    z-index:            1;
    color:              ${({ textColor}) => textColor};
`;