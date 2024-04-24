import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProjectBrowser = () => {
    const location = useLocation();
    const [filter, setFilter] = useState('');
    const [projects, setProjects] = useState([]); // Assume project list is predefined or fetched

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const tag = query.get('tag');
        setFilter(tag);

        // Dummy logic for setting projects based on the tag. Update this based on your actual data handling.
        setProjects(projects.filter(project => project.tags.includes(tag)));
    }, [location]);

    return (
        <Grid container spacing={2}>
            {projects.map((project) => (
                <Grid item key={project.id} xs={12} sm={4} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={project.image}
                            alt={project.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {project.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {project.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProjectBrowser;
