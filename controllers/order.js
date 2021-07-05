const Order = require("../models/orders");
const OrderItem = require("../models/orderItems");
const mongoose = require("mongoose");
require("dotenv").config();

//609e6819ef52a537911e4554
//60ab7deaf5a9f328a04e631e

//user:60a396be8d65ae2f9a087657

exports.createOrder = async (request, response) => {
  const orderItemIds = Promise.all(
    request.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();
      console.log(newOrderItem);
      return newOrderItem;
    })
  );
  let orderIdResolved = await orderItemIds;

  const totalPrices = await Promise.all(
    orderIdResolved.map(async (orderItemId) => {
      const order = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      console.log(order);

      const totalPrice = order.product.price * order.quantity;

      return totalPrice;
    })
  );

  const total_Price = totalPrices.reduce((a, b) => a + b, 0);
  console.log(total_Price);

  try {
    let {
      user,
      shippingAddress,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
    } = request.body;

    let newOrder = new Order({
      orderItems: orderIdResolved,
      user,
      shippingAddress,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
      totalPrice: total_Price,
    });

    let orderData = await newOrder.save();
    return response.status(200).json({
      success: true,
      message: orderData,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: `Failed to create a new order due to ${error} `,
    });
  }
};

exports.getAllOrders = async (request, response) => {
  try {
    let allOrders = await Order.find({})
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      })
      .sort({ createdAt: -1 });
    return response.status(200).json({
      success: "true",
      message: allOrders,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: ` Failed to get all orders due to ${error}`,
    });
  }
};

exports.getSingleOrder = async (request, response) => {
  try {
    let singleOrder = await Order.findById(request.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      });
    return response.status(200).json({
      success: true,
      message: singleOrder,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: `Failed to get a single order due to ${error}`,
    });
  }
};

exports.updateOrderStatus = async (request, response) => {
  try {
    const updated_order_id = request.params.id;
    if (!mongoose.isValidObjectId(updated_order_id))
      return response.status(404).json({
        Success: false,
        message: `Invalid Category ID ${updated_order_id}`,
      });
    let status = request.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      updated_order_id,
      status,
      { new: true }
    )
      .populate("user", "name")
      .populate({ path: "orderItems", populate: "product" });
    return response.status(200).json({
      Success: true,
      message: updatedOrder,
    });
  } catch (error) {
    return response.status(422).json({
      Success: false,
      message: `Failed to update a order with this ID ${updated_order_id}`,
    });
  }
};

exports.deleteOrderById = async (request, response) => {
  try {
    const order_id = request.params.id;
    if (!mongoose.isValidObjectId(order_id))
      return response.status(404).json({
        Success: false,
        message: `Invalid Order ID ${order_id}`,
      });
    const deleteOrder = await Order.findByIdAndRemove(order_id);
    if (deleteOrder) {
      deleteOrder.orderItems.map(async (order) => {
        await OrderItem.findByIdAndRemove(order);
      });
    }

    return response.status(200).json({
      Success: true,
      message: `Order with this ID ${order_id} have been deleted successfully`,
    });
  } catch (error) {
    return response.status(422).json({
      Success: false,
      message: `Failed to delete the order with this ID ${order_id}`,
    });
  }
};

exports.totalSales = async (request, response) => {
  const total_sales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
   
  ]);
  
  if (!total_sales) {
    return response
      .status(400)
      .json({ Success: false, message: "Failed to generate total sales" });
  }
  response.status(200).json({ Success: true, totalsales: total_sales.pop().totalsales });
};

exports.getUserOrders =  async(request,response)=>{
  
  try {
    const userId = request.params.id
    let userOrders = await Order.findById(userId)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      })
      .sort({ createdAt: -1 });
    return response.status(200).json({
      success: "true",
      message: userOrders,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: ` Failed to get all user orders due to ${error}`,
    });
  }
}