import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import ExpandingCard from '../Display/ExpandingCard';

export const RadialContentItem = ({ title, children, ...props }) => (
    <div {...props}>
        {children}
    </div>
)

const Radial = ({ color='black', width=2, children }) => {
    const containerRef = useRef(null);
    const [positions, setPositions] = useState([]);
    const [radius, setRadius] = useState(0);
    const theme = useTheme();
    const cardVariants = {
        initial: (pos) => ({
            position: 'absolute',
            left: pos.left,
            top: pos.top,
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            height: 'fit-content',
            alignItems: 'center',
            justifyContent: 'center',
        }),
        expanded: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            transform: 'none',
            backgroundColor: theme.palette.surfaceSecondary.main,
            zIndex: 101
        },
    };
    useEffect(() => {
        const updatePositions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const size = Math.min(rect.width, rect.height);
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const baseRadius = size / 5; // Adjust this base radius as needed
                const newRadius = baseRadius + children.length * 10; // Adjust the scale factor as needed
                setRadius(newRadius);
                const angleStep = (2 * Math.PI) / children.length;

                const newPositions = Array.from({ length: children.length }).map((_, index) => {
                    const angle = index * angleStep;
                    return {
                        left: centerX + newRadius * Math.cos(angle),
                        top: centerY + newRadius * Math.sin(angle),
                    };
                });

                setPositions(newPositions);
            }
        };

        updatePositions();
        window.addEventListener('resize', updatePositions);
        return () => window.removeEventListener('resize', updatePositions);
    }, [children.length]);

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
            {radius > 0 && (
                <svg
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: `${radius * 2}px`,
                        height: `${(radius * 2) + 5}px`,
                        pointerEvents: 'none',
                    }}
                >
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke={ color }
                        strokeWidth={`${width}`}
                        fill="none"
                    />
                </svg>
            )}
            {React.Children.map(children, (child, index) => {
                const pos = positions[index];
                const title = child.props.title; // Capture the title property from the child

                return (
                    pos && (
                        <ExpandingCard
                            key={index}
                            title={title}
                            custom={pos}
                            initial="initial"
                            animate="expanded"
                            variants={cardVariants}
                            {...child.props}
                        >
                            {child}
                        </ExpandingCard>
                    )
                );
            })}
        </div>
    );
};

export default Radial;
