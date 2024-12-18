import styled from 'styled-components';

export const LoaderIcon = styled.img`
    height:             160px;
`;

export const LoaderContainer = styled.div`
    flex:               1;
    width:              100%;
    height:             100%;
    justify-content:    center;
    display:            flex;
    position:           fixed;
    align-items:        center;
    transition:         all 500ms ease-in-out;
    z-index:            ${({ show }) => show ? 1000000 : -1000000};
    opacity:            ${({ show }) => show ? 1 : 0};
    background:         rgba(234, 239, 253, 0.5);
    flex-direction:     column;
`;