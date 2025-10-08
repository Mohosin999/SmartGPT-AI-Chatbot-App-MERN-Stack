const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const authenticateRefresh = require("../middleware/authenticateRefresh");
const { controllers: authController } = require("../api/v1/auth");
const { controllers: chatController } = require("../api/v1/chat");
const { controllers: imageController } = require("../api/v1/image");
const { controllers: messageController } = require("../api/v1/message");

// Auth routes
router
  .post("/api/v1/auth/register", authController.register)
  .post("/api/v1/auth/login", authController.login)
  .post("/api/v1/auth/logout", authenticate, authController.logout)
  .post(
    "/api/v1/auth/refresh",
    authenticateRefresh,
    authController.refreshToken
  );

// Chat routes
router
  .route("/api/v1/chats")
  .get(authenticate, chatController.findAllItems)
  .post(authenticate, chatController.create);

router
  .route("/api/v1/chats/:id")
  .get(authenticate, chatController.findSingleItem)
  .delete(authenticate, chatController.removeItem);

// Message routes
router.post("/api/v1/messages", authenticate, messageController.create);

// Image routes
router.post("/api/v1/images", authenticate, imageController.create);

module.exports = router;
