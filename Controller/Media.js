const SuperAdminProject = require('../Model/SuperAdminProjectModel');

exports.addMediaCategory = async (req, res) => {
    const Project_Id = req.params.Project_Id;
    const file = req.file;

    try {
        const project = await SuperAdminProject.findOne({ _id: Project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const newCategory = {
            categoryName: req.body.categoryName,
            image: file ? file.path : null
        };

        if (file) {
            project.Media.push(newCategory);
            await project.save();
            return res.json({ message: 'Media Category Added Successfully' });
        } else {
            return res.status(400).json({ message: 'File not provided' });
        }

    } catch (error) {
        console.error('Error Adding Media Category:', error);
        return res.status(500).json({ error: 'Failed to add Media Category' });
    }
};

exports.deleteMediaCategory = async (req, res) => {
    const Project_Id = req.params.Project_Id;
    const Category_Id = req.params.Category_Id; // Assuming you pass the Blog ID as a parameter

    try {
        // Retrieve the project document by its ID
        const project = await SuperAdminProject.findOne({ _id: Project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Find the index of the blog in the project's blog array
        const categoryIndex = project.Media.findIndex((category) => category._id.toString() === Category_Id);

        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Remove the blog from the project's blog array
        project.Media.splice(categoryIndex, 1);

        // Save the updated project document
        await project.save();

        res.status(200).json({
            message: 'Category Deleted Successfully',
            project: project
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Category', error });
    }
};


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
};

