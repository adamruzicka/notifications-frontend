import PropTypes from 'prop-types';

export const LoadingState = (props) => {
    const { loading, placeholder, children } = props;

    if (loading) {
        return placeholder;
    }

    return children;
};

LoadingState.propTypes = {
    placeholder: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool // Is assumed to be false if undefined
};

export default LoadingState;
