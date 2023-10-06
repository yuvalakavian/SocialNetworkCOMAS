// TODO: implement posts service 

const Post = require('../models/post');
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_KEY_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET
});

const getAllPosts = async () => {
    const posts = await Post.find().populate('user');

    try {
        return posts;
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`)
    }
};

async function getCustomPosts(userIds) {
    try {
        const posts = await Post.find({ user: { $in: userIds } }).populate('user');
        return posts;
    } catch (err) {
        console.error('Error finding posts :', err);
        throw new Error(`Error finding posts : ${error.message}`)
    }
}

const createComment = async (data) => {
    if (!data || !data.id || !data.comment) {
        console.error('Invalid user data. All fields are required.')
        throw new Error('Invalid user data. All fields are required.')
    }

    const existingPost = await Post.findOne({ _id: data.id });

    try {
        comments = existingPost.comments
        comments.push(data.comment)
        await existingPost.save();
        return existingPost;
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`)
    }
};

const createPost = async (userId, postData) => {
    console.log("user", postData)
    if (!userId || !postData || !postData.content) {
        console.error('Invalid user data. All fields are required.')
        throw new Error('Invalid user data. All fields are required.')
    }

    postData['user'] = userId

    const newPost = new Post(postData);

    try {
        await newPost.save();
        console.log('User created successfully:', newPost);
        return newPost;
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`)
    }
};


const increaseLike = async (data) => {

    if (!data.id) {
        console.error('Invalid user data. All fields are required.')
        throw new Error('Invalid user data. All fields are required.')
    }

    const existingPost = await Post.findOne({ _id: data.id });

    try {
        existingPost.likes += 1
        await existingPost.save();
        console.log('Likes updated successfully:', existingPost);
        return existingPost;
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`)
    }
};


const deletePost = async (data) => {

    if (!data.id) {
        console.error('Invalid user data. All fields are required.')
        throw new Error('Invalid user data. All fields are required.')
    }

    const existingPost = await Post.findOneAndDelete({ _id: data.id })

    try {
        return existingPost;
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`)
    }
};

function postTweet(data) {
    client.v2.tweet(data.tweetText).then((val) => {
        console.log(val)
    }).catch((err) => {
        console.log(err)
    })

}

module.exports = {
    createPost,
    getCustomPosts,
    getAllPosts,
    increaseLike,
    deletePost,
    createComment,
    postTweet,
};
