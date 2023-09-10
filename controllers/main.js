const mainModel = require('../models/main')

exports.getMain = function(req, res){
    const images = mainModel.getImages()   

    res.render('main.ejs', {images : images})
}
