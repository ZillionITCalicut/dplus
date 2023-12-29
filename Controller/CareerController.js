const CareerModel = require('../Model/CareerModel');

exports.registerCareers = async (req, res) => {
    const {
        userName,
        userEmail,
        userPhone,
        status,
        postApplied,
        gender,
        zipCode
    } = req.body;
    const file = req.file;

    try {

        const registerCareers = new CareerModel({
            userName,
            userEmail,
            userPhone,
            status,
            postApplied,
            gender,
            zipCode,
            resume: file.path,
        });

        await registerCareers.save();

        res.json({
            message: 'Our Team will Contact You',
        });
    } catch (error) {
        console.error('Error registering:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getallCareers = async (req, res) => {
    try {
        const careers = await CareerModel.find();
        if (careers && careers.length > 0) {
            res.status(200).json(careers);
        } else {
            res.status(404).json({ message: 'No Careers found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Careers', error });
    }
};

exports.deleteCareers = async (req, res) => {
    const careersId = req.params.careersId;

    try {
        const deletedCareer = await CareerModel.findByIdAndDelete(careersId);

        if (deletedCareer) {
            res.status(200).json({ message: 'Career deleted successfully' });
        } else {
            res.status(404).json({ message: 'Career not found' });
        }
    } catch (error) {
        console.error('Error deleting Career:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


