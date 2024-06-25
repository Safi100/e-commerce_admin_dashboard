const Advertisement = require('../models/advertisement')
const {cloudinary} = require('../cloudinary/index')

module.exports.getAdvertisement = async (req, res) => {
    const advertisements = await Advertisement.find()
    res.json(advertisements)
}
module.exports.newAdvertisements = (req, res) => {
    const { advertisementLink } = req.body
    const newAdvertisements = new Advertisement({
        image: {
            url: req.file.path,
            filename: req.file.filename
        },
        link: advertisementLink.toLowerCase()
    })
    newAdvertisements.save()
    res.status(200).json(newAdvertisements)
}
module.exports.deleteAdvertisements =  async (req, res) => {
    try{
        const DeletedAdvertisement = await Advertisement.find({ _id: { $in: req.body } })
        DeletedAdvertisement.forEach(async Advertisement => {
            await cloudinary.uploader.destroy(Advertisement.image.filename)
        });
        await Advertisement.deleteMany({_id: {$in: req.body} })
        res.json(true)
    }catch(e){
        console.log(e);
    }
}