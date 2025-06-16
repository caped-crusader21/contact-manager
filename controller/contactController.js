const { response } = require("express");

const getContacts=(request, response)=>{
    response.status(200).json({message:"Get all Contacts"})
};

const getContact=(request, response)=>{
    response.status(200).json({message:`Get Contact for ${request.params.id}`})
};

const createContact=(request,response)=>{
    console.log("The request body: ", request.body);
    const {name,email,phone} =request.body;

    if(!name || !email || !phone){
        response.status(400);
        throw new Error("All fields are Mandatory");
    }
    response.status(201).json({message: "New Contact Created..."})
};

const updateContact= (request,response)=>{
    response.status(200).json({message:`Contact Updated for: ${request.params.id}`})
};

const deleteContact=(request,response)=>{
    response.status(200).json({message:`Contact Deleted for: ${request.params.id}`})
};

module.exports={
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};