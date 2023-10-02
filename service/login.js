const crypto = require('crypto');
const axios = require('axios');

const User = require('../models/user');

async function profilePictureHandler(firstName, lastName) {
  try {
        const response = await axios.get(`https://ui-avatars.com/api/?name=${firstName}+${lastName}}&background=random&size=200`, {
        responseType: 'arraybuffer'
    });
    if (response.status === 200) {
      const imageBuffer = Buffer.from(response.data, 'binary');
      const base64Image = "data:image/png;base64," + imageBuffer.toString('base64');
      return base64Image
    } else {
      console.error("API request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


const hashHandler = (password) => {
    const sha256hash = crypto.createHash('sha256');
    sha256hash.update(password);
    const hashedPassword = sha256hash.digest('hex');
    return hashedPassword
}

const createUser = async (userData) => {
    if (!userData || !userData.email || !userData.firstName || !userData.lastName || !userData.country || !userData.city || !userData.streetAddress || !userData.password) {
        console.error('Invalid user data. All fields are required.')
        throw new Error('Invalid user data. All fields are required.')
    }

    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
        console.error('User is already registered.')
        throw new Error('User is already registered.')
    }
    
    userData.password = hashHandler(userData.password)
    userData.profilePicture = await profilePictureHandler(userData.firstName, userData.lastName)

    const newUser = new User(userData);

    try {
        await newUser.save()
        console.log('User created successfully:', newUser)
        return newUser
    } catch (error) {
        console.error(`Error creating user: ${error.message}`)
        throw new Error(`Error creating user: ${error.message}`)
    }
};

const loginUser = async (userData) => {
    const hashedPassword = hashHandler(userData.password)
    
    const existingUser = await User.findOne({ email: userData.email, password: hashedPassword });    
    if (existingUser) {
        console.log(existingUser._id)
        return existingUser._id
    }
    else{
        // console.log("Not correct creds")
        throw new Error('The user or password is incorrect')
    }
}

module.exports = {
    createUser,
    loginUser
};
