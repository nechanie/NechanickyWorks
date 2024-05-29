import { Panorama, Storage, EmojiObjects, DeveloperBoard, Troubleshoot, Hub } from '@mui/icons-material';

export const AboutThisSiteActions = ([
	{ icon: <EmojiObjects />, name: 'Inspiration', link: 'inspiration' },
	{ icon: <DeveloperBoard />, name: 'Planning', link: 'planning' },
	{ icon: <Panorama />, name: 'Front End', link: 'frontend' },
	{ icon: <Storage />, name: 'Back End', link: 'backend' },
	{ icon: <Troubleshoot />, name: 'Challenges', link: 'challenges' },
	{ icon: <Hub />, name: 'Final Product', link: 'product' },
]);

export const AboutThisSiteTocContent = ([
	{ name: 'Inspiration for the Site', subcontent: [{ name: 'Reasoning', link: 'reasoning' }, { name: 'Expectation', link: 'expectation' }] },
	{ name: 'Planning of the Site', subcontent: [{ name: 'Format', link: 'format' }, { name: 'Goals', link: 'goals' }, { name: 'Content Choices', link: 'content' }, { name: 'Process', link: 'process' }] },
	{ name: 'Construction of the Site - Front End', subcontent: [{ name: 'Framework', link: 'feframework' }, { name: 'Languages', link: 'languages' }, { name: 'Design Choices', link: 'fedesign' }, { name: 'Hosting', link: 'fehosting' }, { name: 'Cost', link: 'fecost' }, { name: 'Tools, Libraries, and Resources', link: 'feresources' }] },
	{ name: 'Construction of the Site - Back End', subcontent: [{ name: 'Server and Server Specs', link: 'beserver' }, { name: 'Hosting', link: 'behosting' }, { name: 'Containerization', link: 'becontainerization' }, { name: 'API and Frameworks', link: 'beframework' }, { name: 'Databases', link: 'bedatabase' }, { name: 'Compute Resources', link: 'becompute' }, { name: 'Network', link: 'benetwork' }, { name: 'Tools, Libraries, and Resources', link: 'beresources' }] },
	{ name: 'Challenges', subcontent: [{ name: 'Affordability', link: 'challenges' }, { name: 'Networking', link: 'challenges' }, { name: 'Resource Allocation', link: 'challenges' }] },
	{ name: 'Final/Current Product', subcontent: [{ name: 'System Achitecture', link: 'architecture' }, { name: 'System Analytics', link: 'analytics' }, { name: 'Roadmap', link: 'roadmap' }] }
])

export const AboutThisSiteCodePrimary = `
import React from 'react';
import { Typography, Container, Box } from '@mui/material';


function WelcomeMessage() {
	return (
		<Container>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
				textAlign="center"
			>
				<Typography variant="h2">
					Welcome To NechanickyWorks
				</Typography>
			</Box>
		</Container>
	);
}

export default WelcomeMessage;
`;