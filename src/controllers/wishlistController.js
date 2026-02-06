import Wishlist from "../models/Wishlist/Wishlist.js";

export const createWishlist = async (req, res, next) => {
  try {
    const {
      productId,
      userName,
      userEmail,
      authorName,
      authorEmail,
      productName,
      description,
      price,
      productImage,
      brand,
      category,
      quantity,
      sku,
      status,
    } = req.body;

    if (!userName || !userEmail || !productName || !price || !category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingItem = await Wishlist.findOne({
      userEmail,
      productName,
    });

    if (existingItem) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    const wishlistItem = new Wishlist({
      productId,
      userName,
      userEmail,
      authorName,
      authorEmail,
      productName,
      description,
      price,
      productImage,
      brand,
      category,
      quantity: quantity || 1,
      sku,
      status: status || "wishlist",
    });

    await wishlistItem.save();

    res.status(201).json({
      message: "Wishlist item created successfully",
      wishlistItem,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserWishlist = async (req, res, next) => {
  try {
    const { userEmail } = req.params;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "User email is required",
      });
    }

    const wishlistItems = await Wishlist.find({ userEmail });

    const totalPrice = wishlistItems.reduce((acc, item) => {
      return acc + (item.price || 0);
    }, 0);

    res.status(200).json({
      success: true,
      count: wishlistItems.length,
      totalPrice: totalPrice,
      wishlist: wishlistItems,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWishlist = async (req, res, next) => {
  try {
    const { wishlistId } = req.params;

    const wishlistDelete = await Wishlist.findByIdAndDelete(wishlistId);

    if (!wishlistDelete) {
      return res.status(404).json({ message: "wishList not found" });
    }

    res.status(200).json({
      message: "wishList deleted successfully",
      product: wishlistDelete,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteManyData = async (req, res, next) => {
  try {
    const { userEmail } = req.params;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "User email is required",
      });
    }

    const result = await Wishlist.deleteMany({ userEmail });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No wishlist items found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} wishlist item(s) deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};
