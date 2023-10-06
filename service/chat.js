const session = require("express-session");
const Chat = require("../models/chat");
const User = require("../models/user");

const getUserFriends = async (userId) => {
    const user = await User.findById(userId).populate('friends');
    if (!user) {
        throw Error("user does not exists")
    }
    return user?.friends || [];
}
const getChat = async (fromUserId, toUserId) => {

    const chat = await Chat.findOne({
        $or: [
            { from: fromUserId, to: toUserId },
            { from: toUserId, to: fromUserId }
        ]
    });

    if (!chat) {
        throw Error("chat does not exists")
    }
    return chat;

}

const createNewChat = async (fromUserId, toUserId) => {

    const chat = new Chat({
        from: fromUserId,
        to: toUserId
    });
    await chat.save()
    console.log("create chat was sucessfully!")
}

const sendMessage = async (data, sentBy) => {
    const { chatId, value } = data;
    const chat = await Chat.findOne({ _id: chatId });
    chat.messages.push({ sentBy, value });
    await chat.save();
}

module.exports = {
    getChat,
    sendMessage,
    getUserFriends,
    createNewChat
}