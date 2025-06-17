const { response } = require("express");
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (request, response) => {
  const contacts = await Contact.find();
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
  });

  response.status(201).json(contact);
});

const updateContact = asyncHandler(async (request, response) => {
  const contact = Contact.findById(request.params.id);
  if (!contact) {
    response.status(404);
    throw new Error("Contact not Found");
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

  response.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
