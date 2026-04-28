import Store from "../models/Store.js";

// CREATE STORE
export const createStore = async (req, res) => {
  try {
    const { name, location, description } = req.body;

    const store = await Store.create({
      name,
      location,
      description,
      owner: req.user._id,
    });
    
   // Upgrade user to store_owner if not already
if (req.user.role !== "store_owner") {
  req.user.role = "store_owner";
  await req.user.save();
} 

    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: "Error creating store" });
  }
};

// GET ALL STORES (for testing)
export const getStores = async (req, res) => {
  try {
    const stores = await Store.find().populate("owner", "name email");
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stores" });
  }
};