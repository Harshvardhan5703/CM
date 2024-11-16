import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { Container, Typography, Paper, Box, CssBaseline } from '@mui/material';
import { fetchContacts } from './api';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2' // Edit button color
    },
    secondary: {
      main: '#d32f2f' // Delete button color
    }
  }
});

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const data = await fetchContacts();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    getContacts();
  }, []);

  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
  };

  const handleSave = () => {
    setSelectedContact(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1976d2 30%, #d32f2f 90%)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="30vh">
            <Typography variant="h3" component="h1" gutterBottom style={{ marginTop: '20px', color: '#fff' }}>
              Contact Management
            </Typography>
            <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '800px', marginTop: '20px' }}>
              <ContactForm 
                selectedContact={selectedContact} 
                onSave={handleSave} 
                onClear={() => setSelectedContact(null)} 
                onAddContact={handleAddContact} 
              />
            </Paper>
          </Box>
          <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '1200px', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
            <ContactList 
              contacts={contacts} 
              setContacts={setContacts} 
              onEdit={handleEdit} 
            />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
