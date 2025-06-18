const { response } = require("express");
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (request, response) => {
  const contacts = await Contact.find({ user_id: request.user.id });
  response.status(200).json(contacts);
});

const getContact = asyncHandler(async (request, response) => {
  const contact = await Contact.findById(request.params.id);
  if (!contact) {
    response.status(404);
    throw new Error("Contact not found");
  }
  response.status(200).json(contact);
});

const createContact = asyncHandler(async (request, response) => {
  console.log("The request body: ", request.body);
  const { name, email, phone } = request.body;

  if (!name || !email || !phone) {
    response.status(400);
    throw new Error("All fields are Mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: request.user.id,
  });

  response.status(201).json(contact);
});

const updateContact = asyncHandler(async (request, response) => {
  const contact = await Contact.findById(request.params.id);
  if (!contact) {
    response.status(404);
    throw new Error("Contact not Found");
  }

  if (contact.user_id.toString() !== request.user.id) {
    response.status(403);
    throw new Error("This user is not authorized to update this contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  response.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (request, response) => {
  const contact = await Contact.findByIdAndDelete(request.params.id);
  if (!contact) {
    response.status(404);
    throw new Error("Contact not Found");
  }

  if (contact.user_id.toString() !== request.user.id) {
    response.status(403);
    throw new Error("This user is not authorized to delete this contact");
  }
  
  response.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
