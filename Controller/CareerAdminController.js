const CareerAdminModel = require('../Model/SuperAdminProjectModel');


exports.addCareerItem = async (req, res) => {
    const project_Id = req.params.project_Id;

    try {
        // Retrieve the project document by its ID
        const project = await CareerAdminModel.findOne({ _id: project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const newCareer = {
            JobName: req.body.JobName,
            JobExpirence: req.body.JobExpirence,
            JobRole: req.body.JobRole,
            JobLocation: req.body.JobLocation,
            ctcInfo: req.body.ctcInfo,
            JobDescription: req.body.JobDescription,
            status: req.body.status
        };

        project.Career.push(newCareer);

        await project.save();

        res.status(201).json({ message: 'Added Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding Blog', error });
    }
};

exports.deleteCareerItem = async (req, res) => {
    const project_Id = req.params.project_Id;
    const careerItemId = req.params.careerItemId; // Assuming you pass the career item ID as a route parameter

    try {
        // Retrieve the project document by its ID
        const project = await CareerAdminModel.findOne({ _id: project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Find the index of the career item to delete
        const careerItemIndex = project.Career.findIndex(item => item._id.toString() === careerItemId);

        if (careerItemIndex === -1) {
            return res.status(404).json({ message: 'Career item not found' });
        }

        // Remove the career item from the array
        project.Career.splice(careerItemIndex, 1);

        await project.save();

        res.status(200).json({ message: 'Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting career item', error });
    }
};


exports.updateCareerItem = async (req, res) => {
    const project_Id = req.params.project_Id;
    const careerItemId = req.params.careerItemId;

    try {
        // Retrieve the project document by its ID
        const project = await CareerAdminModel.findOne({ _id: project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Find the career item by its ID within the project
        const careerItem = project.Career.id(careerItemId);

        if (!careerItem) {
            return res.status(404).json({ message: 'Career item not found' });
        }

        // Update career item properties based on request body
        careerItem.JobName = req.body.JobName || careerItem.JobName;
        careerItem.JobExpirence = req.body.JobExpirence || careerItem.JobExpirence;
        careerItem.JobRole = req.body.JobRole || careerItem.JobRole;
        careerItem.JobLocation = req.body.JobLocation || careerItem.JobLocation;
        careerItem.ctcInfo = req.body.ctcInfo || careerItem.ctcInfo;
        careerItem.JobDescription = req.body.JobDescription || careerItem.JobDescription;
        careerItem.status = req.body.status || careerItem.status;

        await project.save();

        res.status(200).json({ message: 'Updated Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Career item', error });
    }
};


