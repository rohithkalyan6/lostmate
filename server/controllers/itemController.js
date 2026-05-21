const Item = require("../models/item");

const normalizeItemImage = (item) => {
  if (!item) return item;

  const plainItem = item.toObject ? item.toObject() : item;

  return {
    ...plainItem,
    image: plainItem.image || plainItem.imageUrl || "",
  };
};

const normalizeItemImages = (items) => items.map(normalizeItemImage);

// Report Item
exports.reportItem = async (req, res) => {
  try {
    console.log("--- Received Item Report ---");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { title, description, category, location, type, itemSize } = req.body;
    
    // multer-storage-cloudinary usually puts the Cloudinary URL in req.file.path.
    const image = req.file ? (req.file.path || req.file.secure_url || req.file.url || "") : "";
    
    console.log("Image URL to save in MongoDB:", image);
    console.log("Cloudinary image field candidates:", {
      path: req.file?.path,
      secure_url: req.file?.secure_url,
      url: req.file?.url,
      image,
    });

    // reportedBy should come from authenticated user (req.user set by middleware)
    const reportedBy = req.user && req.user.id ? req.user.id : null;

    const item = await Item.create({
      title,
      description,
      category,
      location,
      type,
      itemSize,
      image,
      reportedBy,
    });

    console.log("Item saved successfully to MongoDB:", item._id);
    res.json({ message: "Item reported successfully", item: normalizeItemImage(item) });

  } catch (error) {
    console.error("Error in reportItem:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all items (approved only)
exports.getItems = async (req, res) => {
  try {
    const { category, location, type } = req.query;
    let query = { status: "approved" };

    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: "i" }; // Case-insensitive matching
    if (type) query.type = type;

    const items = await Item.find(query).sort({ createdAt: -1 }).populate("reportedBy", "email");
    res.json(normalizeItemImages(items));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single approved item by id
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id,
      status: { $in: ["approved", "returned"] },
    }).populate("reportedBy", "email");

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(normalizeItemImage(item));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get lost items (approved only)
exports.getLostItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "approved", type: "lost" }).sort({ createdAt: -1 }).populate("reportedBy", "email");
    res.json(normalizeItemImages(items));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get found items (approved only)
exports.getFoundItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "approved", type: "found" }).sort({ createdAt: -1 }).populate("reportedBy", "email");
    res.json(normalizeItemImages(items));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pending items (admin only)
exports.getPendingItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "pending" }).sort({ createdAt: -1 }).populate("reportedBy", "email");
    res.json(normalizeItemImages(items));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve Item
exports.approveItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json({ message: "Item approved", item: normalizeItemImage(item) });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject Item
exports.rejectItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    res.json({ message: "Item rejected and deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark item as returned
exports.markReturned = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status: "returned" },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item marked as returned", item: normalizeItemImage(item) });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
