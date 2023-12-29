const RecentProjects = require('../Model/SuperAdminProjectModel');

exports.addRecenProjects = async (req, res) => {
    const id = req.params.Project_Id;

    try {
        const superAdminProject = await RecentProjects.findOne({ _id: id });

        if (!superAdminProject) {
            return res.status(404).json({ message: 'Not Found' });
        }

        const { Project_Ids1 } = req.body;

        if (!Project_Ids1 || Project_Ids1.length === 0) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the Project_Ids1 already exists in the recentProject array
        const existingDetailIndex = superAdminProject.recentProject.findIndex(
            detail => detail.Project_Ids1 === Project_Ids1
        );

        // If it exists, replace the existing entry; otherwise, add a new entry
        if (existingDetailIndex !== -1) {
            superAdminProject.recentProject[existingDetailIndex] = { Project_Ids1 };
        } else {
            // If not found, add a new entry
            superAdminProject.recentProject = [{ Project_Ids1 }];
        }

        await superAdminProject.save();

        res.status(201).json({ message: 'Updated Successfully' });
    } catch (error) {
        console.error('Error adding:', error);
        res.status(500).json({ message: 'Error adding', error: error.message });
    }
};
