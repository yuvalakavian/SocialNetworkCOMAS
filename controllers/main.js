const mainModel = require('../models/main')

exports.getMain = function(req, res){
    const images = mainModel.getImages()   

    res.render('main.ejs', {images : images})
}

// exports.getImage = function(req, res){
//     const imageId = req.query.id

//     const image = imagesModel.getImage(imageId)   

//     res.render('image.ejs', {image})
// }

