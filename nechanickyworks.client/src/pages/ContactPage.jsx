import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';

const ContactPage = () => {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here
        console.log(contactForm);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Contact Me</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Feel free to reach out to me by filling out the form, or through any of the following methods.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Direct Contact</Typography>
                        <Typography variant="body1">Email: Ethan.Nechanicky@gmail.com</Typography>
                        <Typography variant="body1">Phone: +1 (406) 381 4030</Typography>
                        {/* Add more contact options as needed */}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            variant="outlined"
                            margin="normal"
                            value={contactForm.name}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            value={contactForm.email}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            value={contactForm.message}
                            onChange={handleChange}
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Send Message
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactPage;
