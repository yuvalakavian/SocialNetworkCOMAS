const images = [
    {id : 1, name : 'logo.jpg'}
]

exports.getImages = () => {
    return images
}

exports.getImage = (id) => {
    return images.filter(function(item){
        return item.id == id
    })[0]
}