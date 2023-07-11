// messageController.js
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");

// عملية إنشاء مسج جديد
const createMessage = async (req, res) => {
  try {
    const { senderId } = req.params;

    //check is the sender exist
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ message: "المرسل غير موجود" });
    }

    const { receiverId, messageContent } = req.body;

    // التحقق مما إذا كان المرسل إلية في جدول
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "المرسل إليه غير موجود " });
    }

    const newMessage = new Message({
      sender: senderId, // استخدام معرف المرسل
      receiverId,
      messageContent,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

// get

const getMessagesById = async (req, res) => {
  const _id = req.params.id;
  Message.findById(_id)
    .then((message) => {
      if (!message) {
        return res.status(404).send("message not found");
      }
      res.status(200).send(message);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

//////////
// Get all messages by the sender's ID

const getMessagesBySender = async (req, res) => {
  try {
    const senderId = req.user._id.toString();

    const messages = await Message.find({ sender: senderId });
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).send("Failed to retrieve messages", e.message);
  }
};

module.exports = {
  createMessage,
  getMessagesById,
  getMessagesBySender,
};
