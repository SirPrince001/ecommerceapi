const router = require("express").Router();
const Orders = require("../controllers/order");

router.post("/api/v1/create-order", Orders.createOrder);
router.get("/api/v1/get-orders", Orders.getAllOrders);
router.get("/api/v1/get-order-by-id/:id", Orders.getSingleOrder);
router.put("/api/v1/update-order-by-id/:id", Orders.updateOrderStatus);
router.delete("/api/v1/delete-order-by-id/:id", Orders.deleteOrderById);
router.get("/api/v1/get-totalsales", Orders.totalSales);
router.get("/api/v1/get-user-orders/:id", Orders.getUserOrders);
module.exports = router;
