const User = require('../models/user');
const Post = require('../models/post');

async function getCitiesAndCounts() {
    try {
        const flilter = [ {
            $group: {
                _id: '$city', 
                count: { $sum: 1 }
            } }
        ];
        const result = await User.aggregate(flilter);
        let sortedData = result.sort((a, b) => b.count - a.count);
        
        sortedData = sortedData.map(item => {
            return {
              Country: item._id,
              Value: item.count
            };
          });
        
        // return first 6 cities
        return sortedData.slice(0, 6);
    } 
    catch (error) {
        console.error("Error:", error);
    }
}
async function getLikesPerWeek() {
    const currentDate = new Date();
    const weekDuration = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const numberOfWeeks = 6;
    
    const weeklyData = [];

    for (let i = 0; i < numberOfWeeks; i++) {
        const startDate = new Date(currentDate - weekDuration * (i + 1));
        const endDate = new Date(currentDate - weekDuration * i);

        try {
            const posts = await Post.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            });

            const totalLikes = posts.reduce((acc, post) => acc + post.likes, 0);

            weeklyData.push({
                date: startDate.toISOString().split('T')[0],
                value: totalLikes
            });
        } catch (error) {
            console.error('Error occurred pulling posts:', error);
            return;
        }
    }
    return weeklyData
}

async function getPostsPerWeek() {
    const currentDate = new Date();
    const numberOfWeeks = 6;
    const weekDuration = 7 * 24 * 60 * 60 * 1000; 

    const weeklyData = [];

    for (let i = 0; i < numberOfWeeks; i++) {
        const startDate = new Date(currentDate - weekDuration * (i + 1));
        const endDate = new Date(currentDate - weekDuration * i);
        try {
            const postCount = await Post.countDocuments({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            });

            weeklyData.push({
                date: startDate.toISOString().split('T')[0],
                value: postCount
            });
        } catch (error) {
            console.error('Error occurred pulling posts:', error);
            return;
        }
    }
    return weeklyData
}

module.exports = {
    getCitiesAndCounts,
    getLikesPerWeek,
    getPostsPerWeek

};