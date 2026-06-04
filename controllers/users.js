const { ObjectId } = require('mongodb');
const { getUsersCollection } = require('../models/users');

// Get all of the customers' information

const getAllUsers = async (req, res) => {
    // #swagger.tags = ['Users']

    try {
        const usersCollection = await getUsersCollection();
        const users = await usersCollection.find().toArray();
        res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Get one customer by ID

const getUserById = async (req, res) => {
    // #swagger.tags = ['Users']
    
    try {
        const usersCollection = await getUsersCollection();

        if (!ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({ message: 'userId is not valid' });
        }

        const user = await usersCollection.findOne({ _id: new ObjectId(req.params.userId ) } 
    );

        if (!user) {
            return res.status(404).json({ message: 'User could not be found' });
        
        }

        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Create a new customer's user

const createUser = async (req, res) => {
    // #swagger.tags = ['Users']

    try {
    const usersCollection = await getUsersCollection();

    if (!req.body.customerName || !req.body.email) {
       return res.status(400).json({ message: 'Missing the required fields' });
    }

const user = {
    customerName: req.body.customerName,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email
};

    const result = await usersCollection.insertOne(user);

    res.status(201).json({ _id: result.insertedId,
        customerName: user.customerName,
        address: user.address,
        phone: user.phone,
        email: user.email
    });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Update a customer's information

const updateUser = async (req, res) => {
    // #swagger.tags = ['Users']

    try {
    const usersCollection = await getUsersCollection();

    if (!ObjectId.isValid(req.params.userId)) {
    return res.status(400).json({ message: 'userId is not valid' });
    }

    if (!req.body.customerName || !req.body.email) {
        return res.status(400).json({ message: 'Missing the required fields'});
    }

    const userId = new ObjectId(req.params.userId);

    const result = await usersCollection.updateOne(
        { _id: userId },
        {
            $set: {
                customerName: req.body.customerName,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email
            }
        }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'User could not be found'});
    }

    const updatedUser = await usersCollection.findOne({ _id: userId });

    return res.status(200).json({ message: 'User has been updated successfully', user: updatedUser });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Delete a customer's user

const deleteUser = async (req, res) => {
    // #swagger.tags = ['Users']

    try {
        const usersCollection = await getUsersCollection();

        if (!ObjectId.isValid(req.params.userId)) {
            return res.status(400).json({ message: 'userId is not valid' });
        }

        const userId = new ObjectId(req.params.userId);

        const result = await usersCollection.deleteOne({ _id: userId });

        if (result.deletedCount === 0){
            return res.status(404).json({ message: 'User could not be found' });
        }

        return res.status(200).json({ message: 'User has been deleted successfully' });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}; 

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};