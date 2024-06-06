import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import SiteFooter from '../components/Shared/Footer';

const pricingTiers = [
    {
        title: 'Standard Website Solution',
        price: '$3,500',
        features: [
            '1 Full website with no special integrated features',
            'Work with you (the customer) to design each part of the site',
            'On-call assistance/troubleshooting/support'
        ]
    },
    {
        title: 'Website Pro Solution',
        price: '$8,000',
        features: [
            'All services included in the Standard Website Solution',
            '1 Special integrated feature',
            'Website designed to support future special integration additions (each integration beyond the included 1 can be added for an additional fee)'
        ]
    },
    {
        title: 'Website Surplus Solution',
        price: '$12,000',
        features: [
            'All services included in the Standard Website Solution',
            '3 Special integrated features',
            'Website designed to support future special integrations (each integration beyond the included 3 can be added for an additional fee)',
            '50% discount on all fees associated with additional special integrations beyond the included 3'
        ]
    }
];

const additionalInfo = [
    {
        title: 'All service tiers include:',
        features: [
            'Free text/image updates on existing content',
            'Hourly fee for larger design changes: $40/hour (minimum $20)'
        ]
    },
    {
        title: 'Special Integrations include:',
        features: [
            'External site embeddings',
            'Custom API integrations',
            'Features requiring a database'
        ]
    },
    {
        title: 'Additional fees:',
        features: [
            'Hosting fees: $50-100/month',
            'Special integration fees (associated with paid access to APIs and additional hosting fees for custom APIs and databases)'
        ]
    }
];

const ConsultingPricePage = () => {
    return (
        <>
        <Container sx={{paddingTop: '64px'} }>
            <Container maxWidth="xl" sx={{padding:"3%"} }>
            <Typography variant="h4" component="h1" gutterBottom>
                Nechanicky Solutions LLC - Service Tiers
            </Typography>
            <Grid container spacing={4}>
                {pricingTiers.map((tier, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {tier.title}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                    {tier.price}
                                </Typography>
                                <Box component="ul" sx={{ pl: 2 }}>
                                    {tier.features.map((feature, i) => (
                                        <Typography component="li" key={i}>
                                            {feature}
                                        </Typography>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                    </Grid>
            <Container maxWidth="sm">
            <Box mt={4}>
                {additionalInfo.map((info, index) => (
                    <Box key={index} mb={3}>
                        <Typography variant="h6" component="h3">
                            {info.title}
                        </Typography>
                        <Box component="ul" sx={{ pl: 2 }}>
                            {info.features.map((feature, i) => (
                                <Typography component="li" key={i}>
                                    {feature}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                ))}
                        </Box>
                    </Container>
                </Container>
            </Container>
        <SiteFooter/>
        </>
    );
};

export default ConsultingPricePage;
