const MemberList = require('../Model/SuperAdminProjectModel');

exports.addmember = async (req, res) => {
    const Project_Id = req.params.Project_Id;
    const file = req.file;

    try {
        const project = await MemberList.findOne({ _id: Project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const newMember = {
            fullName: req.body.fullName,
            jobRole: req.body.jobRole,
            phone: req.body.phone,
            email: req.body.email,
            status: req.body.status,
            memberFile: file ? file.path : null
        };

        if (file) {
            project.Member.push(newMember);
            await project.save();
            return res.json({ message: 'Member Added Successfully' });
        } else {
            return res.status(400).json({ message: 'File not provided' });
        }

    } catch (error) {
        console.error('Error Adding Member:', error);
        return res.status(500).json({ error: 'Failed to Add Member' });
    }
};

exports.deleteMember = async (req, res) => {
    const Project_Id = req.params.Project_Id;
    const Member_Id = req.params.Member_Id; // Assuming you pass the Blog ID as a parameter

    try {
        // Retrieve the project document by its ID
        const project = await MemberList.findOne({ _id: Project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Find the index of the blog in the project's blog array
        const memberIndex = project.Member.findIndex((member) => member._id.toString() === Member_Id);

        if (memberIndex === -1) {
            return res.status(404).json({ message: 'Member not found' });
        }

        // Remove the blog from the project's blog array
        project.Member.splice(memberIndex, 1);

        // Save the updated project document
        await project.save();

        res.status(200).json({
            message: 'Member Deleted Successfully',
            project: project
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Member', error });
    }
};

/* 
exports.addMediaGalleryImages = async (req, res) => {
    const Project_Id = req.params.Project_Id;
    const Category_Id = req.params.Category_Id;
    const files = req.files;

    try {
        const project = await SuperAdminProject.findOne({ _id: Project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const item = project.Media.id(Category_Id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Ensure that images_id is initialized as an array
        if (!item.images_id) {
            item.images_id = [];
        }

        // Process and store each file path in the item.images_id array
        files.forEach((file) => {
            // Assuming file.path is the path to the uploaded file
            item.images_id.push(file.path);
        });

        console.log('File Paths:', item.images_id); // Add this line


        const newGalleryData = files.map((file) => ({
            imageName: file.originalname,
            imagePath: file.path,
            images_id: [file.path], // Wrap the file path in an array
        }));

        // Append the new data to the existing Gallery1 array
        item.Gallery1 = [...(item.Gallery1 || []), ...newGalleryData];

        console.log('Updated Item:', item);
        // Save the updated project document
        await project.save();

        return res.json({
            message: 'Media Gallery Images Added Successfully',
            item: {
                categoryName: item.categoryName,
                image: item.image,
                _id: item._id,
                Gallery1: item.Gallery1,

            },
        });

    } catch (error) {
        console.error('Error Adding Media Category:', error);
        return res.status(500).json({ error: 'Failed to add Media Category' });
    }
}; */

