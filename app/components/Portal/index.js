import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends PureComponent {

    constructor(props) {
        super(props);
        const enableBackgroundBlocker = props.enableBackgroundBlocker ? 'enable-background-blocker' : ''
        this.elem = document.createElement('div');
        this.elem.setAttribute('class', `portal-container ${enableBackgroundBlocker}`);
    }

    componentDidMount() {
        document.body.appendChild(this.elem);
    }

    componentWillUnmount() {
        document.body.removeChild(this.elem);
    }

    render() {
        const { children } = this.props;
        return ReactDOM.createPortal( children, this.elem );
    }

}

Portal.propTypes = {
    /** When true, user will not interact with application in background. */
    enableBackgroundBlocker: PropTypes.bool
};

export default Portal;
