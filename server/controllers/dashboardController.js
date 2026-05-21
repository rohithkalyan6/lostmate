const Item = require("../models/item");

exports.getStats = async (req, res) => {
  try {
    const [totalItems, totalLostItems, totalFoundItems, totalReturnedItems] = await Promise.all([
      Item.countDocuments(),
      Item.countDocuments({ type: "lost" }),
      Item.countDocuments({ type: "found" }),
      Item.countDocuments({ status: "returned" })
    ]);

    res.json({
      totalItems,
      totalLostItems,
      totalFoundItems,
      totalReturnedItems
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
