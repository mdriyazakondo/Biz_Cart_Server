import AddToCart from "../models/AddToCart/AddToCart.js";

/* ===============================
   CREATE / ADD TO CART
================================ */
export const createAddToCart = async (req, res, next) => {
  try {
    const {
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

    const existingItem = await AddToCart.findOne({
      userEmail,
      productName,
    });

    // ✅ যদি product আগে থেকেই থাকে
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.price = existingItem.unitPrice * existingItem.quantity;

      await existingItem.save();

      return res.status(200).json({
        message: "Product quantity updated in cart",
        cartItem: existingItem,
      });
    }

    // ✅ নতুন product হলে
    const AddToCartItem = new AddToCart({
      userName,
      userEmail,
      authorName,
      authorEmail,
      productName,
      description,

      unitPrice: price,
      quantity: quantity || 1,
      price: price * (quantity || 1),

      productImage,
      brand,
      category,
      sku,
      status: status || "AddToCart",
    });

    await AddToCartItem.save();

    res.status(201).json({
      message: "AddToCart item created successfully",
      AddToCartItem,
    });
  } catch (error) {
    next(error);
  }
};

/* ===============================
   GET USER CART
================================ */
export const getAllAddToCart = async (req, res, next) => {
  try {
    const { userEmail } = req.params;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "User email is required",
      });
    }

    const AddToCartItems = await AddToCart.find({ userEmail });

    const totalPrice = AddToCartItems.reduce(
      (acc, item) => acc + item.price,
      0,
    );

    const totalQuantity = AddToCartItems.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );

    res.status(200).json({
      success: true,
      count: totalQuantity,
      totalPrice,
      AddToCart: AddToCartItems,
    });
  } catch (error) {
    next(error);
  }
};

/* ===============================
   INCREMENT (+)
================================ */
export const incrementCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cartItem = await AddToCart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity += 1;
    cartItem.price = cartItem.unitPrice * cartItem.quantity;

    await cartItem.save();

    res.status(200).json({
      message: "Cart item quantity increased",
      cartItem,
    });
  } catch (error) {
    next(error);
  }
};

/* ===============================
   DECREMENT (-) | 1 হলে delete
================================ */
export const decrementCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cartItem = await AddToCart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (cartItem.quantity <= 1) {
      await cartItem.deleteOne();
      return res.status(200).json({
        message: "Cart item removed",
        cartItemId: id,
      });
    }

    cartItem.quantity -= 1;
    cartItem.price = cartItem.unitPrice * cartItem.quantity;

    await cartItem.save();

    res.status(200).json({
      message: "Cart item quantity decreased",
      cartItem,
    });
  } catch (error) {
    next(error);
  }
};

/* ===============================
   DELETE CART ITEM
================================ */
export const deleteAddToCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedItem = await AddToCart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "AddToCart not found" });
    }

    res.status(200).json({
      message: "AddToCart deleted successfully",
      product: deletedItem,
    });
  } catch (error) {
    next(error);
  }
};
