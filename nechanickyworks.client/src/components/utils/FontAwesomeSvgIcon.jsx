import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from '@mui/material';

const FontAwesomeSvgIcon = React.forwardRef((props, ref) => {
    const { icon } = props;

    // Check if the icon prop is a FontAwesome icon
    if (icon && typeof icon === 'object' && icon.iconName) {
        const { icon: [width, height, , , svgPathData] } = icon;
        return (
            <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
                {typeof svgPathData === 'string' ? (
                    <path d={svgPathData} />
                ) : (
                    svgPathData.map((d, i) => (
                        <path key={i} style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
                    ))
                )}
            </SvgIcon>
        );
    }
    // Check if the icon prop is a valid React element
    if (React.isValidElement(icon)) {
        const IconComponent = icon;
        return <IconComponent/>;
    }

    // Handle cases where icon is a component function or class
    if (typeof icon === 'function' || typeof icon === 'object') {
        const IconComponent = icon;
        return (
                <IconComponent />
        );
    }

    // Fallback or error message if the icon prop is neither
    console.error('Invalid icon prop:', icon);
    return null;
});

FontAwesomeSvgIcon.displayName = 'FontAwesomeSvgIcon';

FontAwesomeSvgIcon.propTypes = {
    icon: PropTypes.any.isRequired,
};

export default FontAwesomeSvgIcon;