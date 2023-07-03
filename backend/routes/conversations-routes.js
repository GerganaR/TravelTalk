const express = require("express");
const router = require("./users-routes");
const conversationsController = require("../controllers/conversations-controller");

//new conv
router.post("/", conversationsController.newConversation);

//get conv of a user
router.get("/:userId", conversationsController.getConversation);

//get conv of a user
router.get(
  "/find/:firstUserId/:secondUserId",
  conversationsController.getConversationByTwoUsers
);

module.exports = router;
