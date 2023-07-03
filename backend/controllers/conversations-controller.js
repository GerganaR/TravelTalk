const mongoose = require("mongoose");
const Conversation = require("../models/conversation");

//post conversations
const newConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get cov of a user
const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get conv includes two user Id
const getConversationByTwoUsers = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getConversationByTwoUsers = getConversationByTwoUsers;
exports.newConversation = newConversation;
exports.getConversation = getConversation;
