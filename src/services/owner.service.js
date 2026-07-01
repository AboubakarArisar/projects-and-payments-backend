const Owner = require('../models/owner.model');

// Controller function to create a new Owner
exports.createOwner = async (name, email, phone, password) => {
    // Create a new Owner instance
    const newOwner = new Owner({
      name,
      email,
      phone,


      
      password
    });
    
    // Save the Owner to the database
    await newOwner.save();
 
    return  newOwner;
  
};

// Controller function to get all Owners
exports.getAllOwners = async (req, res) => {
    // Retrieve all Owners from the database
    const Owners = await Owner.find();
    
    return Owners;
  
};

// Other controller functions for updating, deleting, getting a single Owner, etc. can be added here...
