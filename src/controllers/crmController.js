import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

const Contact = mongoose.model("Contact", ContactSchema);

export const addNewContact = async (req, res) => {
	let newContact = new Contact(req.body);

	try {
		const contact = await newContact.save();
		res.json(contact);
	} catch (error) {
		console.warn(error);
		res.status(500).send(error.message);
	}
};

export const getContacts = async (req, res) => {
	try {
		const allContacts = await Contact.find({});
		res.json(allContacts);
	} catch (error) {
		console.warn(error);
		res.status(500).send(error.message);
	}
};

export const getContactWithId = async (req, res) => {
	try {
		const contact = await Contact.findById(req.params.contactId);
		res.json(contact);
	} catch (error) {
		console.warn(error);
		res.status(500).send(error.message);
	}
};

export const updateContact = async (req, res) => {
	try {
		const updatedContact = await Contact.findOneAndUpdate(
			{ _id: req.params.contactId },
			req.body,
			{ new: true }
		);
		res.json(updatedContact);
	} catch (error) {
		console.warn(error);
		res.status(500).send(error.message);
	}
};

export const deleteContact = async (req, res) => {
	try {
		const deletedContact = await Contact.deleteOne({
			_id: req.params.contactId,
		});
		res.json({ message: "Successfully deleted contact" });
	} catch (error) {
		console.warn(error);
		res.status(500).send(error.message);
	}
};

// export const getContacts = (req, res) => {
//     Contact.find({}, (err, contact) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(contact);
//     })
// }
// export const addNewContact = (req, res) => {
// 	let newContact = new Contact(req.body);

// newContact.save((err, contact) => {
// 	if (err) {
// 		res.send(err);
// 	}
// 	res.json(contact);
// });
