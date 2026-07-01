const catchAsync = require("../middlewares/catchAsyncError"); // Update the path accordingly

// Import the OwnerService
const OwnerService = require("../services/owner.service");

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUser(email, password);
  res.status(200).json({ message: "Login successful", user });
  return user;
});

// Controller function to create a new Owner
exports.createOwner = catchAsync(async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  // Call the service function to create a new Owner
  const newOwner = await OwnerService.createOwner(name, email, phone, password);

  res
    .status(201)
    .json({ message: "Owner created successfully", data: newOwner });
});

// Controller function to get all Owners
exports.getAllOwners = catchAsync(async (req, res, next) => {
  // Call the service function to get all Owners
  const Owners = await OwnerService.getAllOwners();

  res.status(200).json({ data: Owners });
});

// Other controller functions for updating, deleting, getting a single Owner, etc. can be added here...
