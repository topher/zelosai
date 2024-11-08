import styled, { css } from 'styled-components';

import { grid } from '../../util/Constants';

export const DropdownContainer = styled.div`
    display:        flex;
    flex:           1;
    position:       relative;
    top:            10px;
    box-sizing:     border-box;
    z-index:        1000;
    border-radius:  10px;
    left:           0px;
    flex-direction: column;
    background:     #EAEFFD;
    box-shadow:     0 3px 6px rgba(0,0,0,0.4);
    padding:        8px 0;
`;

export const TopDropdownContainer = styled(DropdownContainer)`
    top:            0;
    left:           ${grid.ELLIPSIS_ICON_WIDTH}px;
`

export const MeetsSecondaryContainer = styled(DropdownContainer)`
    top: -178px;
    left: 323px;
    bottom: unset;
`

export const DropdownMenu = styled.ul`
    text-align: left;
    min-width: 140px;
    max-height: 400px;
    overflow: auto;
    padding: 20px 0 30px 0;
    white-space: nowrap;
    box-sizing: border-box;
    ${props => props.hasCheckbox && css`
        padding: 0px 30px 20px 40px;
        &:first-child ${ DropdownItem } {
            padding-top: 0;
        }
        ${ DropdownItem } {
            padding: 5px 0px;
        }
    `}
`;

export const DropdownItem = styled.li`
    padding: 5px 30px;
    font-size: 18px;
    color: #011627;
    position: relative;
    cursor: pointer;
    font-family: 'Roboto Mono', monospace;
    background-color: ${props => props.selected ? 'rgba(42, 68, 148, .2)': 'initial'};
`;

export const DropdownItemSeparator = styled.hr`
    border-top: 1px solid #8DA3CC;
`;

export const DropdownSelectedItem = styled.img`
    position: absolute;
    left: -25px;
    top: 5px;
`;

export const Button = styled.button`
    z-index: 1;
    background: #2A4494;
    color: #fff;
    border: none;
    padding: 6px 12px;
    box-sizing: border-box;
    border-radius: 10px;
    min-width: 50px;
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
