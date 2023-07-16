const Advertisement = require('../models/advertisement')

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