const User = require('../models/user');

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


module.exports = {
    getCitiesAndCounts
};