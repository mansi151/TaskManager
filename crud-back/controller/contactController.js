const controlService = require('../service/contactService');

const createContact = async (req, res) => {
    try {
        console.log('req..', req.body)
        const createData = await controlService.createContact(req.body);
        if (createData) {
            res.json(createData)
        }
    } catch (e) {
        throw new Error('Error', e)
    }
}

const signupUser = async (req, res) => {
    try {
        const signupContact = await controlService.signUpUser(req.body);
        if (signupContact) {
            res.json(signupContact)
        }
    } catch (e) {
        throw new Error('Error', e)
    }
}

const loginUser = async (req, res) => {
    try {
        const loginUser = await controlService.loginUser(req.body)
        res.json(loginUser)
    } catch (e) {
        res.status(400).json({ message: e.message || "Something went wrong" });
    }
}

const findContact = async (req, res) => {
    try {
        const contacts = await controlService.findContact();
        if (contacts.length > 0) {
            res.json(contacts)
        }
        else {
            res.json([])
        }
    } catch (e) {
        throw new Error('Error..', e.message)
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params
        console.log('id..', id)
        const deleteContact = await controlService.deleteContact(id)
        res.json(deleteContact)
    }
    catch (e) {
        throw new Error('Error in delete', e.message)
    }
}

const editContact = async (req, res) => {
    try {
        const data = req.body
        const updateData = await controlService.editContact(data);
        res.json(updateData);
    }
    catch (e) {
        throw new Error('Error in editing', e.message)
    }
}

const markAsFav = async (req, res) => {
    try {
        const data = req.body
        const markAsFavo = await controlService.markAsFav(data)
        res.json(markAsFavo)
    }
    catch (e) {
        throw new Error('Error in fav.', e.message)
    }
}

module.exports = {
    createContact,
    findContact,
    deleteContact,
    editContact,
    markAsFav,
    signupUser,
    loginUser
}