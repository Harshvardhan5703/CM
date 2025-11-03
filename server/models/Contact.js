import mongoose from 'mongoose';

/**
 * Represents the schema for a contact in a MongoDB database.
 * @param {String} firstName - The first name of the contact (required).
 * @param {String} lastName - The last name of the contact (required).
 * @param {String} email - The email address of the contact (required, unique).
 * @param {String} phoneNumber - The phone number of the contact (required).
 * @param {String} company - The company the contact is associated with.
 * @param {String} jobTitle - The job title of the contact.
 */
const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  company: { type: String },
  jobTitle: { type: String },
});

export default mongoose.model('Contact', ContactSchema);
