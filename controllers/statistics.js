const statisticsService = require('../service/statistics')

const page = async (req, res) => {
    res.render("../views/statistics/index.ejs");
};

const getPopularCities = async (req, res) => {
    const citiesAndCounts = await statisticsService.getCitiesAndCounts()
    res.status(200).json(citiesAndCounts)
}

module.exports = {
    page,
    getPopularCities
}
