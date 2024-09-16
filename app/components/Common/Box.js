import styled from "styled-components";
import colors from './Colors';

export const BoxContainer = styled.div`
    height: 100vh;
    height: calc(100vh - 270px);
`;
export const Box = styled.div`
    position: relative;
    background-color: ${colors.white};
    height: 100%;
    margin: 23px;
    padding: 30px 50px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
`;

export const BoxSideBar = styled.div`
`;

export const BoxHeader = styled.div`
    margin-bottom: 50px;
    margin-left: 23px;
`;
export const BoxBody = styled.div`
    padding: 50px;
`;

export const BoxTitle = styled.p`
    color: ${colors.white};
    font-size: 81px;
    font-weight: bold;
    line-height: 1.5;
`;

export const BoxSubtitle = styled.p`
    font-size: 24px;
`;