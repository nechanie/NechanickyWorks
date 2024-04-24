import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, CardHeader, Chip, Box, Switch, FormControlLabel } from '@mui/material';
import GaussImage from "../../assets/imgs/gauss.jpg";
import InteractiveCardMedia from '../Shared/InteractiveCardMedia';

const CardTableItemTag = ({ tag, ...props }) => {
    let tagColor = null;
    switch (tag.ref) {
        case 'ed':
            tagColor = 'error';
            break;
        case 'demo':
            tagColor = 'info';
            break;
        case 'ml':
            tagColor = 'success';
            break;
    }
    return (
        <Chip variant="outlined" label={tag.text} color={tagColor} size="small" {...props} />
    );
};

const CardTableItem = ({ projectData, ...props }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(projectData.href);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} {...props}>
            <Card sx={{ maxWidth: 345, minHeight: 300 }}>
                <CardActionArea onClick={handleCardClick}>
                    <InteractiveCardMedia text={projectData.description}>
                        <CardMedia
                            component={Box}
                            sx={{ minHeight: 200, maxWidth: 'inherit' }}
                            image={projectData.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                {projectData.name}
                            </Typography>
                            {projectData.tags.map((tag) => (
                                <CardTableItemTag key={tag.id} tag={tag} />
                            ))}
                        </CardContent>
                    </InteractiveCardMedia>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

const CardTable = ({ projectList=null }) => {

    const tempData = [
        {
            id: 1,
            name: 'Trustworthy Machine Learning',
            description: 'Explore the impact of hyperparameters on AI robustness with our interactive demo. Train neural networks, face adversarial attacks, and discover the balance of AI resilience.',
            image: GaussImage,
            href: "projects/TrustworthyMachineLearning",
            tags: [{
                id: 1, ref: 'ed', text: 'Educational'
            }, { id: 2, ref: 'demo', text: 'Interactive Demo' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
        },
        {
            id: 2,
            name: 'Trustworthy Machine Learning',
            description: 'Explore the impact of hyperparameters on AI robustness with our interactive demo. Train neural networks, face adversarial attacks, and discover the balance of AI resilience.',
            image: GaussImage,
            href: "projects/TrustworthyMachineLearning",
            tags: [{
                id: 1, ref: 'ed', text: 'Educational'
            }, { id: 2, ref: 'demo', text: 'Interactive Demo' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
        },
        {
            id: 3,
            name: 'Trustworthy Machine Learning',
            description: 'Explore the impact of hyperparameters on AI robustness with our interactive demo. Train neural networks, face adversarial attacks, and discover the balance of AI resilience.',
            image: GaussImage,
            href: "projects/TrustworthyMachineLearning",
            tags: [{
                id: 1, ref: 'ed', text: 'Educational'
            }, { id: 2, ref: 'demo', text: 'Interactive Demo' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
        },
        {
            id: 4,
            name: 'Trustworthy Machine Learning',
            description: 'Explore the impact of hyperparameters on AI robustness with our interactive demo. Train neural networks, face adversarial attacks, and discover the balance of AI resilience.',
            image: GaussImage,
            href: "projects/TrustworthyMachineLearning",
            tags: [{
                id: 1, ref: 'ed', text: 'Educational'
            }, { id: 2, ref: 'demo', text: 'Interactive Demo' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
        },
        {
            id: 5,
            name: 'Trustworthy Machine Learning',
            description: 'Explore the impact of hyperparameters on AI robustness with our interactive demo. Train neural networks, face adversarial attacks, and discover the balance of AI resilience.',
            image: GaussImage,
            href: "projects/TrustworthyMachineLearning",
            tags: [{
                id: 1, ref: 'ed', text: 'Educational'
            }, { id: 2, ref: 'demo', text: 'Interactive Demo' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
        },
        {
            id: 6,
            name: 'Trustworthy Machine Learning',
            description: 'Explore the impact of hyperparameters on AI robustness with our interactive demo. Train neural networks, face adversarial attacks, and discover the balance of AI resilience.',
            image: GaussImage,
            href: "projects/TrustworthyMachineLearning",
            tags: [{
                id: 1, ref: 'ed', text: 'Educational'
            }, { id: 2, ref: 'demo', text: 'Interactive Demo' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
        },
        {
            id: 7,
            name: 'Trustworthy Machine Learning',
            description: 'Explore the impact of hyperparameters on AI robustness with our interactive demo. Train neural networks, face adversarial attacks, and discover the balance of AI resilience.',
            image: GaussImage,
            href: "projects/TrustworthyMachineLearning",
            tags: [{
                id: 1, ref: 'ed', text: 'Educational'
            }, { id: 2, ref: 'demo', text: 'Interactive Demo' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
        },
        {
            id: 8,
            name: 'Trustworthy Machine Learning',
            description: 'Explore the impact of hyperparameters on AI robustness with our interactive demo. Train neural networks, face adversarial attacks, and discover the balance of AI resilience.',
            image: GaussImage,
            href: "projects/TrustworthyMachineLearning",
            tags: [{
                id: 1, ref: 'ed', text: 'Educational'
            }, { id: 2, ref: 'demo', text: 'Interactive Demo' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
        },
        {
            id: 9,
            name: 'Trustworthy Machine Learning',
            description: 'Explore the impact of hyperparameters on AI robustness with our interactive demo. Train neural networks, face adversarial attacks, and discover the balance of AI resilience.',
            image: GaussImage,
            href: "projects/TrustworthyMachineLearning",
            tags: [{
                id: 1, ref: 'ed', text: 'Educational'
            }, { id: 2, ref: 'demo', text: 'Interactive Demo' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
        }
    ]

    const [activeTags, setActiveTags] = useState([]);

    const toggleTag = (tag) => {
        setActiveTags((currentTags) => currentTags.includes(tag) ? currentTags.filter(t => t !== tag) : [...currentTags, tag]);
    };

    const filteredData = tempData.filter(project =>
        activeTags.length === 0 || project.tags.some(tag => activeTags.includes(tag.ref))
    );
    return (
        <React.Fragment>
            <Grid container spacing={0} sx={{ marginBottom: 2 }}>
                {[{
                    id: 1, color: 'error', text: 'Educational', ref: 'ed'
                }, { id: 2, color: 'info', text: 'Interactive Demo', ref: 'demo' }, { id: 3, color: 'success', text: 'Machine Learning', ref: 'ml' }, { id: 4, color: 'warning', text: 'Presentation', ref: 'pres' }].map((tag) => (
                    <Grid item key={tag.id}>
                        <FormControlLabel
                            control={<Switch checked={activeTags.includes(tag)} onChange={() => toggleTag(tag)} sx={{display:'none'}} />}
                            label={<Chip label={tag.text} color={activeTags.includes(tag.ref) ? tag.color : 'default'} />}
                        />
                    </Grid>
                ))}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ minHeight: '50%' }}>
                    <Grid container spacing={2}>
                        {filteredData.map((project) => (
                            <CardTableItem key={project.id} projectData={project} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default CardTable;