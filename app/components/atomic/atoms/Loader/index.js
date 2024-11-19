import React from 'react';
import PropTypes from 'prop-types';

import LoadingIcon from '@/app/components/atomic/atoms/Loading_Icon.gif';
import { LoaderContainer, LoaderIcon } from './LoaderStyle.js'

const Loader = ({ show }) => {
    return (
        <LoaderContainer show={show}>
            <LoaderIcon src={LoadingIcon} alt="zelos loading"/>
        </LoaderContainer>
    )
};

Loader.propTypes = {
    show: PropTypes.bool.isRequired
};

export default Loader;