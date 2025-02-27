const { where } = require('sequelize');
const { Contact, User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createContact = async (contactData) => {
    const { firstName, lastName, email, mobileNumber, isStar ,imageUrl} = contactData
    const image = {
        imageUrl
    }
    try {
        const newContact = await Contact.create({
            firstName,
            lastName,
            email,
            mobileNumber,
            isStar,
            imageUrl:image
        })
        return newContact;
    } catch (e) {
        throw new Error('Error creating contact', e.message)
    }
}

const signUpUser = async (signupData) => {
    const { firstName, lastName, email, mobileNumber, password } = signupData
    try {
        const bcryptPassword = await bcrypt.hash(password, 10)
        const createUser = await User.create({
            firstName,
            lastName,
            email,
            mobileNumber,
            password: bcryptPassword
        })
        return createUser;
    } catch (e) {
        throw new Error('Error creating signup user', e.message)
    }
}

const loginUser = async (loginData) => {
    const { email, password } = loginData
    try {
        const checkUser = await User.findOne({
            where: {
                email
            }
        })
        if (!checkUser) {
            throw new Error("User not found");
          }
        if (checkUser) {
            const encryptPass = await bcrypt.compare(password, checkUser.password)
            if (!encryptPass) {
                throw new Error("Please Enter Correct Password");
            }
            console.log('Enter here..', checkUser)

            const data = {
                userName: checkUser.firstName + ' ' + checkUser.lastName,
                userId: checkUser.id
            }
            const token =  jwt.sign(data, 'abc',{expiresIn:'24h'})
            const loginUserData = {
                id:checkUser.id,
                name:checkUser.firstName + ' ' + checkUser.lastName,
                email:checkUser.email,
                token:token
            }
            return loginUserData
        }
    } catch (e) {
        throw new Error('Enter valid details', e.message)
    }
}

const findContact = async () => {
    try {
        const findContact = await Contact.findAll();
        if (findContact.length > 0) {
            return findContact
        }
        else {
            return [];
        }
    } catch (e) {
        console.log('Error while fetching data', e.message)
    }
}

const deleteContact = async (id) => {
    console.log('id..here?', id)
    try {
        const deleteContact = await Contact.destroy({
            where: {
                id: id
            }
        })
        if (deleteContact) {
            return deleteContact;
        }
    }
    catch (e) {
        throw new Error('Error in deleting..', e)
    }
}

const editContact = async (data) => {
    const { firstName, lastName, email, mobileNumber, isStar, id } = data
    try {
        const editData = Contact.update({
            firstName,
            lastName,
            email,
            mobileNumber,
            isStar
        },
            {
                where: {
                    id: id
                }
            }
        )
        if (editData) {
            return editData;
        }
    }
    catch (e) {
        throw new Error('Error while editing..', e.message)
    }
}

const markAsFav = async (data) => {
    const { id, value } = data;
    try {
        const editData = await Contact.update({
            isStar: value
        }, {
            where: {
                id: id
            }
        })
        return editData;
    } catch (e) {
        throw new Error('Error while marking', e.message)
    }
}

module.exports = {
    createContact,
    findContact,
    deleteContact,
    editContact,
    markAsFav,
    signUpUser,
    loginUser
}