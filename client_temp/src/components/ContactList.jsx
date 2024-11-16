import React, { useEffect, useState } from 'react';
import { fetchContacts, deleteContact, updateContact } from '../api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableSortLabel, TablePagination, Alert } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ContactList = ({ contacts, setContacts, onEdit }) => {
  const [editContact, setEditContact] = useState(null); // For editing a contact
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: ''
  });
  const [open, setOpen] = useState(false); // Dialog open state
  const [contactToDelete, setContactToDelete] = useState(null); // Contact to be deleted
  const [order, setOrder] = useState('asc'); // Sorting order
  const [orderBy, setOrderBy] = useState('firstName'); // Sorting column
  const [page, setPage] = useState(0); // Pagination page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Pagination rows per page
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch contacts when the component mounts
    const getContacts = async () => {
      try {
        const data = await fetchContacts();
        setContacts(data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching contacts.');
      }
    };

    getContacts();
  }, [setContacts]);

  const handleDelete = async () => {
    try {
      await deleteContact(contactToDelete._id);
      setContacts(contacts.filter((contact) => contact._id !== contactToDelete._id));
      setOpen(false); // Close the dialog
    } catch (error) {
      setError(error.message || 'An error occurred while deleting the contact.');
    }
  };

  const handleOpenDialog = (contact) => {
    setContactToDelete(contact);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setContactToDelete(null);
  };

  const handleEdit = (contact) => {
    setEditContact(contact); // Set the contact to be edited
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
      company: contact.company,
      jobTitle: contact.jobTitle
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedContact = await updateContact(editContact._id, formData);
      setContacts(
        contacts.map((contact) =>
          contact._id === updatedContact._id ? updatedContact : contact
        )
      );
      setEditContact(null); // Clear the edit form after successful update
    } catch (error) {
      setError(error.message || 'An error occurred while updating the contact.');
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedContacts = contacts.slice().sort((a, b) => {
    if (orderBy === 'firstName') {
      return order === 'asc' ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName);
    }
    if (orderBy === 'lastName') {
      return order === 'asc' ? a.lastName.localeCompare(b.lastName) : b.lastName.localeCompare(a.lastName);
    }
    if (orderBy === 'email') {
      return order === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
    }
    if (orderBy === 'phoneNumber') {
      return order === 'asc' ? a.phoneNumber.localeCompare(b.phoneNumber) : b.phoneNumber.localeCompare(a.phoneNumber);
    }
    if (orderBy === 'company') {
      return order === 'asc' ? a.company.localeCompare(b.company) : b.company.localeCompare(a.company);
    }
    if (orderBy === 'jobTitle') {
      return order === 'asc' ? a.jobTitle.localeCompare(b.jobTitle) : b.jobTitle.localeCompare(a.jobTitle);
    }
    return 0;
  });

  const paginatedContacts = sortedContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Contact List
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {editContact && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Edit Contact
          </Typography>
          <form onSubmit={handleUpdate}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
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
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleFormChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleFormChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  startIcon={<EditIcon />}
                >
                  Update Contact
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setEditContact(null)}
                  fullWidth
                  startIcon={<DeleteIcon />}
                  style={{ marginTop: '10px' }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
      {!editContact && (
        <Paper style={{ marginTop: '20px' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'firstName'}
                      direction={orderBy === 'firstName' ? order : 'asc'}
                      onClick={() => handleRequestSort('firstName')}
                    >
                      First Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'lastName'}
                      direction={orderBy === 'lastName' ? order : 'asc'}
                      onClick={() => handleRequestSort('lastName')}
                    >
                      Last Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'email'}
                      direction={orderBy === 'email' ? order : 'asc'}
                      onClick={() => handleRequestSort('email')}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'phoneNumber'}
                      direction={orderBy === 'phoneNumber' ? order : 'asc'}
                      onClick={() => handleRequestSort('phoneNumber')}
                    >
                      Phone Number
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'company'}
                      direction={orderBy === 'company' ? order : 'asc'}
                      onClick={() => handleRequestSort('company')}
                    >
                      Company
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'jobTitle'}
                      direction={orderBy === 'jobTitle' ? order : 'asc'}
                      onClick={() => handleRequestSort('jobTitle')}
                    >
                      Job Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedContacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>{contact.firstName}</TableCell>
                    <TableCell>{contact.lastName}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phoneNumber}</TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>{contact.jobTitle}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(contact)}
                        startIcon={<EditIcon />}
                        style={{ marginRight: '10px' }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleOpenDialog(contact)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={contacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactList;

