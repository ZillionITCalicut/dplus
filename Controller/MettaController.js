const MettaModel = require('../Model/SuperAdminProjectModel');


exports.addMettaDetails = async (req, res) => {
    const project_Id = req.params.project_Id;
    const { page, title, metatitle, keywords, description } = req.body;

    try {
        // Retrieve the project document by its ID
        const project = await MettaModel.findOne({ _id: project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if a Metta detail with the specified page name already exists
        const existingDetail = project.Metta.find((detail) => detail.page === page);

        if (existingDetail) {
            // Update the existing detail
            existingDetail.title = title;
            existingDetail.metatitle = metatitle;
            existingDetail.keywords = keywords;
            existingDetail.description = description;
        } else {
            // Add a new detail
            const newDetail = {
                page,
                title,
                metatitle,
                keywords,
                description
            };

            project.Metta.push(newDetail);
        }

        await project.save();

        res.status(201).json({ message: 'Added or Updated Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding or updating', error });
    }
};

exports.addProjectMetta = async (req, res) => {
    const projectId = req.params.id;
    const category_Id = req.params.Category_Id;
    const project_Id = req.params.project;
    const { title, metatitle, keywords, description, projectTitleUrl } = req.body;

    try {
        const superAdminProject = await MettaModel.findOne({ _id: projectId });

        if (!superAdminProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const projectCategory = superAdminProject.projectCategory.id(category_Id);

        if (!projectCategory) {
            return res.status(404).json({ message: 'Project Category not found' });
        }

        // Find the project item with the specified project_Id
        let projectItem = projectCategory.projects.id(project_Id);

        // If projectItem doesn't exist, create a new one
        if (!projectItem) {
            projectItem = {
                _id: project_Id,
                title,
                metatitle,
                keywords,
                description,
                projectTitleUrl
            };

            // Push the new projectItem to the projects array
            projectCategory.projects.push(projectItem);
        } else {
            // If projectItem exists, update its metadata
            projectItem.title = title;
            projectItem.metatitle = metatitle;
            projectItem.keywords = keywords;
            projectItem.description = description;
            projectItem.projectTitleUrl = projectTitleUrl;
        }

        // Save the changes
        await superAdminProject.save();

        return res.json({ message: 'Metta Details Added Successfully' });

    } catch (error) {
        console.error('Error adding Metta Details:', error);
        return res.status(500).json({ error: 'Failed to add Metta Details to the project item' });
    }
};