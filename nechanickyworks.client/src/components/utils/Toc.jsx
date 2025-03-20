import React from 'react';
import { Container, Paper, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const NavLink = ({ to, children, ...props }) => {
    const handleClick = (e) => {
        e.preventDefault();
        const targetElement = document.getElementById(to);
        console.log(to);
        console.log(targetElement);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Link to={`#${to}`} onClick={handleClick} {...props}>
            {children}
        </Link>
    );
};
const TocLink = styled(NavLink)({
    color: 'inherit',
    '&:hover': {
        textDecoration: 'underline !important'
    }
});

const TableOfContents = ({ bordering, background, contents }) => {
    return (
        <Container maxWidth="sm">
            <Paper elevation={2} sx={{ border: `3px groove ${bordering}`, boxShadow: 'none', py: '2%', backgroundColor: background }}>
                <Typography variant="h4"><u>Table of Contents</u></Typography>
                <Box sx={{ width: '100%' }}>
                    <List dense={true} sx={{ marginLeft: '10%', paddingRight: '10%' }}>
                        {
                            contents.map((item) => (
                                <div key={item.name}>
                                    <ListItem sx={{ display: 'list-item', listStyleType: 'circle' }}>
                                        <ListItemText primary={item.name} sx={{ fontStyle: 'italic' }} />
                                    </ListItem>
                                    <List component="div" disablePadding dense={true}>
                                        {
                                            item.subcontent.map((subitem) => (
                                                <ListItem key={subitem.name} sx={{ paddingLeft: '20px' }}>
                                                    <TocLink to={subitem.link}>
                                                        <ListItemText primary={subitem.name} />
                                                    </TocLink>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </div>
                            ))
                        }
                    </List>
                </Box>
            </Paper>
        </Container>
    );
};

export default TableOfContents;