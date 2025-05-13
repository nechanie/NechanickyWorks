import React from 'react';
import { Typography, Link } from '@mui/material';
import ContactTab from './ContactTab';
import BugReportImage from '../../../assets/imgs/CardImgs/BugReportImage.webp';
import BugReportImageDark from '../../../assets/imgs/CardImgs/BugReportImageDark.webp';
import BusinessImage from '../../../assets/imgs/CardImgs/BusinessImage.webp';
import BusinessImageDark from '../../../assets/imgs/CardImgs/BusinessImageDark.webp';
import CollaborationImage from '../../../assets/imgs/CardImgs/CollaborationImage.webp';
import CollaborationImageDark from '../../../assets/imgs/CardImgs/CollaborationImageDark.webp';
import OtherImage from '../../../assets/imgs/CardImgs/OtherImage.webp';
import OtherImageDark from '../../../assets/imgs/CardImgs/OtherImageDark.webp';
import ContactTabContent from './ContactTabContent';

const webRepoLink = 'https://github.com/nechanie/NechanickyWorks/issues';

const ContactTabData = ([
    {
        label: <ContactTab title="Website Bug Report" light={BugReportImage} dark={BugReportImageDark} />,
        content: <ContactTabContent statement={
            <Typography align='center' variant='body1'>
                This website is a continuous project, so bug reports are a constant help in maintenance. Don't hesitate to reach out to let me know about any bugs you come across.
                The best way to notify me of these bugs would be to post an issue on the public github repository for this website, which can be found <Link href={webRepoLink} color='inherit' target="_blank" rel="noopener noreferrer">here</Link>.
            </Typography>
        }
            methods={[{
                name: 'github',
                label: 'Github',
                location:'https://github.com/nechanie'
            }]}/>
    },
    {
        label: <ContactTab title="Business" light={BusinessImage} dark={BusinessImageDark} />,
        content: <ContactTabContent statement={
            <Typography align='center' variant='body1'>
                I am always receptive to those who want to contact me about business. If you would like to extend a job opportunity, request business solutions consultation, or similar topics, do not hesitate.
            </Typography>
        }
            methods={[
                {
                    name: 'phone',
                    label: '+1 (406) 381-4030',
                    location: 'tel:+14063814030'
                },
                {
                    name: 'email',
                    label: 'Ethan.Nechanicky@gmail.com',
                    location: 'mailto:Ethan.Nechanicky@gmail.com'
                },
                {
                    name: 'linkedin',
                    label: 'Ethan Nechanicky',
                    location: 'https://www.linkedin.com/in/ethan-nechanicky-492127259'
                }
            ]} />
    },
    {
        label: <ContactTab title="Collaboration" light={CollaborationImage} dark={CollaborationImageDark} />,
        content: <ContactTabContent statement={
            <Typography align='center' variant='body1'>
                If you like my work and would like to propose a collaboration on something, let me know. I love to explore new ways to put my knowledge and skills to use.
            </Typography>
        }
            methods={[
                {
                    name: 'email',
                    label: 'Ethan.Nechanicky@gmail.com',
                    location: 'mailto:Ethan.Nechanicky@gmail.com'
                },
                {
                    name: 'linkedin',
                    label: 'Ethan Nechanicky',
                    location: 'https://www.linkedin.com/in/ethan-nechanicky-492127259'
                }
            ]} />
    },
    {
        label: <ContactTab title="Other" light={OtherImage} dark={OtherImageDark} />,
        content: <ContactTabContent statement={
            <Typography align='center' variant='body1'>
                If you are contacting me about something beyond the scope of the other categories.
            </Typography>
        }
            methods={[
                {
                    name: 'email',
                    label: 'Ethan.Nechanicky@gmail.com',
                    location: 'mailto:Ethan.Nechanicky@gmail.com'
                }
            ]} />
    }
]);

export default ContactTabData;