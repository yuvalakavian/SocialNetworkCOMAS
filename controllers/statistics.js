const statisticsService = require('../service/statistics')

const page = async (req, res) => {
    res.render("../views/statistics.ejs");
};

const getPopularCities = async (req, res) => {
    const citiesAndCounts = await statisticsService.getCitiesAndCounts()
    res.status(200).json(citiesAndCounts)
}

const getLikesPerWeek = async (req, res) => {
    const likesPerWeek = await statisticsService.getLikesPerWeek()
    res.status(200).json(likesPerWeek)
}

const getPostsPerWeek = async (req, res) => {
    const postsPerWeek = await statisticsService.getPostsPerWeek()
    res.status(200).json(postsPerWeek)
}

module.exports = {
    page,
    getPopularCities, 
    getLikesPerWeek,
    getPostsPerWeek
}
