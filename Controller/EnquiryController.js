const EnquiryModel = require('../Model/EnquiryModel');

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
};

const validateUserName = (userName) => {
    const userNameRegex = /^[a-zA-Z\s]+$/;
    return userNameRegex.test(userName);
};

exports.registerEnquiry = async (req, res) => {
    const {
        userName,
        userEmail,
        userPhone,
        userMessage,
        status
    } = req.body;

    // Check if any required field is empty
    if (!userName || !userEmail || !userPhone || !userMessage) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    // Validate email
    if (!validateEmail(userEmail)) {
        return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Validate phone
    if (!validatePhone(userPhone)) {
        return res.status(400).json({ message: 'Please enter a valid 10-digit phone number' });
    }

    // Validate userName
    if (!validateUserName(userName)) {
        return res.status(400).json({ message: 'Please enter a valid name with only letters and spaces' });
    }

    try {
        const registerEnquiries = new EnquiryModel({
            userName,
            userEmail,
            userPhone,
            userMessage,
            status
        });

        await registerEnquiries.save();

        res.json({
            message: 'Enquiry Sent',
        });
    } catch (error) {
        console.error('Error registering Enquiry:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getallEnquiries = async (req, res) => {
    try {
        const enquiries = await EnquiryModel.find();
        if (enquiries && enquiries.length > 0) {
            res.status(200).json(enquiries);
        } else {
            res.status(404).json({ message: 'No Enquiries found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Enquiries', error });
    }
};

exports.deleteEnquiry = async (req, res) => {
    const enquiryId = req.params.enquiryId;

    try {
        const deletedEnquiry = await EnquiryModel.findByIdAndDelete(enquiryId);

        if (deletedEnquiry) {
            res.status(200).json({ message: 'Enquiry deleted successfully' });
        } else {
            res.status(404).json({ message: 'Enquiry not found' });
        }
    } catch (error) {
        console.error('Error deleting Enquiry:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateEnquiryStatus = async (req, res) => {
    const enquiryId = req.params.enquiryId;
    const { status } = req.body;

    try {
        const updatedEnquiry = await EnquiryModel.findByIdAndUpdate(
            enquiryId,
            { status },
            { new: true }
        );

        if (updatedEnquiry) {
            res.status(200).json({ message: 'Enquiry status updated successfully' });
        } else {
            res.status(404).json({ message: 'Enquiry not found' });
        }
    } catch (error) {
        console.error('Error updating Enquiry status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};