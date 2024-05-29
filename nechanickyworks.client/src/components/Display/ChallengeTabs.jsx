import React, { useState } from 'react';
import { Tabs, Box, Typography, Tab } from '@mui/material';

const ChallengesTabs = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Affordability" />
                <Tab label="Networking" />
                <Tab label="Resource Allocation" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Typography>
                    Many of my projects require GPU compute resources for reasonable execution times,
                    which is crucial for interactive demonstrations. However, always-available GPU compute runtimes
                    were prohibitively expensive on cloud platforms like AWS, Google, and Azure. As a cost-effective
                    alternative, I built my own backend compute server using available technologies.
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography>
                    Setting up the necessary networking layers for global access to my site was challenging due to my
                    limited experience with web content distribution over the internet. I had to learn about DNS forwarding
                    and ensuring uptime, as my local network infrastructure does not offer the same reliability as cloud services.
                    I used NoIP for dynamic DNS to ensure the domain remained correctly associated with the changing public
                    IP address of my server.
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography>
                    Managing GPU resources was challenging due to the need for live logging and real-time interaction. Existing resource
                    management tools like Slurm were not ideal, so I developed a custom GPU queuing system. This system ensures efficient
                    distribution of GPU resources and meets the specific needs of my projects.
                </Typography>
            </TabPanel>
        </Box>
    );
};

const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
        {value === index && (
            <Box>
                {children}
            </Box>
        )}
    </div>
);

export default ChallengesTabs;