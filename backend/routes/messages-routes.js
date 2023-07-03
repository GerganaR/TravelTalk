const express = require("express");
const messagesController = require("../controllers/message-controller");
const Message = require("../models/message");

const router = express.Router();
//add
router.post("/", messagesController.addMessage);
// get
router.get("/:conversationId", messagesController.getMessage);
module.exports = router;
