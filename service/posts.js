// TODO: implement posts service 

const Post = require('../models/post');

const getPosts = async () => {
    const posts = await Post.find().populate('user');

    try {
        return posts;
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
        await existingPost.save();
        return existingPost;
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`)
    }
};

module.exports = {
    createPost,
    getPosts,
    increaseLike,
    deletePost,
};
