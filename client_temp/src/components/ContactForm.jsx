import React, { useState, useEffect } from 'react';
import { createContact, updateContact } from '../api';
import { TextField, Button, Grid, Paper, Typography, Alert } from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

const ContactForm = ({ selectedContact, onSave, onClear, onAddContact }) => {
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedContact) {
      setContactData(selectedContact);
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { firstName, lastName, email, phoneNumber } = contactData;
    if (!firstName || !lastName || !email || !phoneNumber) {
      setError('All required fields must be filled out.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (selectedContact) {
        await updateContact(selectedContact._id, contactData);
        onSave();
      } else {
        const newContact = await createContact(contactData);
        onAddContact(newContact);
      }
      setContactData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: ''
      });
    } catch (error) {
      if (error.message.includes('duplicate')) {
        setError('A contact with this email already exists.');
      } else {
        setError(error.message || 'An error occurred while saving the contact.');
      }
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {selectedContact ? 'Edit Contact' : 'Add New Contact'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={contactData.firstName}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={contactData.lastName}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={contactData.email}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={contactData.phoneNumber}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company"
              name="company"
              value={contactData.company}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Job Title"
              name="jobTitle"
              value={contactData.jobTitle}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              fullWidth 
              startIcon={<SaveIcon />}
            >
              {selectedContact ? 'Update Contact' : 'Add Contact'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth 
              startIcon={<CancelIcon />} 
              onClick={onClear}
              style={{ marginTop: '10px' }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactForm;
