import React, { useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';

export function useCurrentBreakpointInverse() {
    const theme = useTheme();
    const getBreakpoint = (width) => {
        const breakpoints = theme.breakpoints.values;
        if (width < breakpoints.sm) {
            return 'xl';
        } else if (width >= breakpoints.sm && width < breakpoints.md) {
            return 'lg';
        } else if (width >= breakpoints.md && width < breakpoints.lg) {
            return 'md';
        } else if (width >= breakpoints.lg && width < breakpoints.xl) {
            return 'sm';
        } else {
            return 'xs';
        }
    };

    const [currentBreakpoint, setCurrentBreakpoint] = useState(getBreakpoint(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setCurrentBreakpoint(getBreakpoint(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return currentBreakpoint;
}

function useCurrentBreakpoint() {
    const theme = useTheme();
    const getBreakpoint = (width) => {
        const breakpoints = theme.breakpoints.values;
        if (width < breakpoints.sm) {
            return 'xs';
        } else if (width >= breakpoints.sm && width < breakpoints.md) {
            return 'sm';
        } else if (width >= breakpoints.md && width < breakpoints.lg) {
            return 'md';
        } else if (width >= breakpoints.lg && width < breakpoints.xl) {
            return 'lg';
        } else {
            return 'xl';
        }
    };

    const [currentBreakpoint, setCurrentBreakpoint] = useState(getBreakpoint(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setCurrentBreakpoint(getBreakpoint(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return currentBreakpoint;
}

export default useCurrentBreakpoint;