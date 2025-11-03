// routes/contacts.js
import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Create a new contact
router.post('/contacts', async (req, res) => {
    console.log(req.body);  

    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    // Retrieve all contacts from the database
    const contacts = await Contact.find();
    // Respond with the list of contacts
    res.json(contacts);
  } catch (error) {
    // Respond with an error message if something goes wrong
    res.status(500).json({ message: error.message });
  }
});

// Update a contact
router.put('/contacts/:id', async (req, res) => {
  try {
    // Find the contact by ID and update with new data
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      // If no contact is found, return a 404 status with an error message
      return res.status(404).json({ message: 'Contact not found' });
    }
    // Respond with the updated contact data
    res.json(updatedContact);
  } catch (error) {
    // Respond with an error message if something goes wrong
    res.status(400).json({ message: error.message });
  }
});

// Delete a contact
router.delete('/contacts/:id', async (req, res) => {
  try {
    // Find the contact by ID and delete it
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      // If no contact is found, return a 404 status with an error message
      return res.status(404).json({ message: 'Contact not found' });
    }
    // Respond with a success message
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    // Respond with an error message if something goes wrong
    res.status(500).json({ message: error.message });
  }
});

export default router;
