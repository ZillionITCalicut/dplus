const ProjectDetails = require('../Model/SuperAdminProjectModel');

exports.addOrUpdateGMapUrl = async (req, res) => {
    const projectId = req.params.id;
    const category_Id = req.params.Category_Id;
    const project_Id = req.params.project;
    const { gmapUrl } = req.body;

    try {
        const superAdminProject = await ProjectDetails.findOne({ _id: projectId });

        if (!superAdminProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const projectCategory = superAdminProject.projectCategory.id(category_Id);

        if (!projectCategory) {
            return res.status(404).json({ message: 'Project Category not found' });
        }

        const projectItem = projectCategory.projects.id(project_Id);

        if (!projectItem) {
            return res.status(404).json({ message: 'Project Item not found' });
        }

        // Add or update gmapUrl in the project
        projectItem.gmapUrl = gmapUrl;

        await superAdminProject.save(); // Save the updated project details

        return res.json({ message: 'Location Link Added Successfully' });

    } catch (error) {
        console.error('Error adding or updating GMap URL:', error);
        return res.status(500).json({ error: 'Failed to add or update GMap URL in the project' });
    }
};

exports.addFaQ = async (req, res) => {
    const projectId = req.params.id;
    const category_Id = req.params.Category_Id;
    const project_Id = req.params.project;
    const { FaQqn, FaQans } = req.body;

    try {
        const superAdminProject = await ProjectDetails.findOne({ _id: projectId });

        if (!superAdminProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const projectCategory = superAdminProject.projectCategory.id(category_Id);

        if (!projectCategory) {
            return res.status(404).json({ message: 'Project Category not found' });
        }

        const projectItem = projectCategory.projects.id(project_Id);

        if (!projectItem) {
            return res.status(404).json({ message: 'Project Item not found' });
        }

        projectItem.FaQ.push({ FaQqn, FaQans });

        await superAdminProject.save();

        return res.json({ message: 'FaQ Added Successfully' });

    } catch (error) {
        console.error('Error adding FaQ:', error);
        return res.status(500).json({ error: 'Failed to add FaQ to the project item' });
    }
};

exports.deleteFaQ = async (req, res) => {
    const projectId = req.params.id;
    const category_Id = req.params.Category_Id;
    const project_Id = req.params.project;
    const faqId = req.params.faqId;

    try {
        const superAdminProject = await ProjectDetails.findOne({ _id: projectId });

        if (!superAdminProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const projectCategory = superAdminProject.projectCategory.id(category_Id);

        if (!projectCategory) {
            return res.status(404).json({ message: 'Project Category not found' });
        }

        const projectItem = projectCategory.projects.id(project_Id);

        if (!projectItem) {
            return res.status(404).json({ message: 'Project Item not found' });
        }

        const faqIndex = projectItem.FaQ.findIndex((faq) => faq._id.toString() === faqId);

        if (faqIndex === -1) {
            return res.status(404).json({ message: 'FaQ not found, Please Refresh...' });
        }

        // Remove the FaQ from the array
        projectItem.FaQ.splice(faqIndex, 1);

        await superAdminProject.save();

        return res.json({ message: 'FaQ Deleted Successfully' });

    } catch (error) {
        console.error('Error deleting FaQ:', error);
        return res.status(500).json({ error: 'Failed to delete FaQ from the project item' });
    }
};

exports.addOrUpdateYoutubeVideo = async (req, res) => {
    const projectId = req.params.id;
    const category_Id = req.params.Category_Id;
    const project_Id = req.params.project;
    const { videoUrl } = req.body;

    try {
        const superAdminProject = await ProjectDetails.findOne({ _id: projectId });

        if (!superAdminProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const projectCategory = superAdminProject.projectCategory.id(category_Id);

        if (!projectCategory) {
            return res.status(404).json({ message: 'Project Category not found' });
        }

        const projectItem = projectCategory.projects.id(project_Id);

        if (!projectItem) {
            return res.status(404).json({ message: 'Project Item not found' });
        }

        // Check if the video URL already exists
        const existingVideo = projectItem.video.find(v => v.videoUrl === videoUrl);

        if (existingVideo) {
            // If the video URL exists, update the existing entry
            existingVideo.videoUrl = videoUrl;
        } else {
            // If the video URL does not exist, add a new entry
            projectItem.video.push({ videoUrl });
        }

        // Mark the document as modified before saving
        projectItem.markModified('video');

        await superAdminProject.save();

        return res.json({ message: 'Added or updated successfully' });

    } catch (error) {
        console.error('Error adding or updating video:', error);
        return res.status(500).json({ error: 'Failed to add or update video for the project item' });
    }
};

exports.deleteYotubeVideos = async (req, res) => {
    const projectId = req.params.id;
    const category_Id = req.params.Category_Id;
    const project_Id = req.params.project;
    const videoId = req.params.videoId;

    try {
        const superAdminProject = await ProjectDetails.findOne({ _id: projectId });

        if (!superAdminProject) {
            return res.status(404).json({ message: 'Project not found, Please Refresh' });
        }

        const projectCategory = superAdminProject.projectCategory.id(category_Id);

        if (!projectCategory) {
            return res.status(404).json({ message: 'Project Category not found, Please Refresh' });
        }

        const projectItem = projectCategory.projects.id(project_Id);

        if (!projectItem) {
            return res.status(404).json({ message: 'Project Item not found, Please Refresh' });
        }

        const faqIndex = projectItem.video.findIndex((faq) => faq._id.toString() === videoId);

        if (faqIndex === -1) {
            return res.status(404).json({ message: 'Video not found, Please Refresh...' });
        }

        // Remove the FaQ from the array
        projectItem.video.splice(faqIndex, 1);

        await superAdminProject.save();

        return res.json({ message: 'Video Deleted Successfully' });

    } catch (error) {
        console.error('Error deleting FaQ:', error);
        return res.status(500).json({ error: 'Failed to delete FaQ from the project item' });
    }
};

exports.deleteProject = async (req, res) => {
    const projectId = req.params.id;
    const category_Id = req.params.Category_Id;
    const project_Id = req.params.project;

    try {
        const superAdminProject = await ProjectDetails.findOne({ _id: projectId });

        if (!superAdminProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const projectCategory = superAdminProject.projectCategory.id(category_Id);

        if (!projectCategory) {
            return res.status(404).json({ message: 'Project Category not found' });
        }

        const projectIndex = projectCategory.projects.findIndex(project => project._id.toString() === project_Id);

        if (projectIndex === -1) {
            return res.status(404).json({ message: 'Project not found, Please Refresh...' });
        }

        // Remove the project from the array
        projectCategory.projects.splice(projectIndex, 1);

        await superAdminProject.save();

        return res.json({ message: 'Project Deleted Successfully' });

    } catch (error) {
        console.error('Error deleting project:', error);
        return res.status(500).json({ error: 'Failed to delete project' });
    }
};

exports.addBlog = async (req, res) => {
    const project_Id = req.params.project_Id;

    try {
        // Retrieve the project document by its ID
        const project = await ProjectDetails.findOne({ _id: project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if a project category with the same name already exists
        const existingBlog = project.blog.find(
            (category) => category.BlogHeading === req.body.BlogHeading
        );

        if (existingBlog) {
            return res.status(400).json({ message: 'Blog with the same Heading already exists' });
        }

        const newBlog = {
            project_Id: req.body.project_Id,
            BlogDate: req.body.BlogDate,
            BlogHeading: req.body.BlogHeading,
            Category: req.body.Category,
            BlogDescription: req.body.BlogDescription,
            BlogDescription1: req.body.BlogDescription1,
            BlogDescription2: req.body.BlogDescription2,
            BlogDescription3: req.body.BlogDescription3,
            BlogAuthor: req.body.BlogAuthor,
            BlogTitleUrl: req.body.BlogTitleUrl,
            BlogMetaTitle: req.body.BlogMetaTitle,
            BlogPageTitle: req.body.BlogPageTitle,
            BlogMetaKeyword: req.body.BlogMetaKeyword,
            BlogMetaDescription: req.body.BlogMetaDescription
        };

        project.blog.push(newBlog);

        await project.save();

        res.status(201).json({
            message: 'Blog Added Successfully',
            project: project
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding Blog', error });
    }
};

exports.addBlogImage = async (req, res) => {
    const Project_Id = req.params.Project_Id;
    const Blog_Id = req.params.Blog_Id;
    const file = req.file;

    try {
        const Project = await ProjectDetails.findOne({ _id: Project_Id });

        if (!Project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const Blog = Project.blog.id(Blog_Id);

        if (!Blog) {
            return res.status(404).json({ message: 'Blog Not Found' });
        }

        if (file) {

            Blog.BlogImage = file.path;
            await Project.save();
            return res.json({ message: 'Blog Image Added Successfully', Blog });
        } else {
            return res.status(400).json({ message: 'File not provided' });
        }
    } catch (error) {
        console.error('Error Adding Blog Image:', error);
        return res.status(500).json({ error: 'Failed to add Blog Image' });
    }
};

exports.deleteBlog = async (req, res) => {
    const project_Id = req.params.project_Id;
    const blog_Id = req.params.blog_Id; // Assuming you pass the Blog ID as a parameter

    try {
        // Retrieve the project document by its ID
        const project = await ProjectDetails.findOne({ _id: project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Find the index of the blog in the project's blog array
        const blogIndex = project.blog.findIndex((blog) => blog._id.toString() === blog_Id);

        if (blogIndex === -1) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Remove the blog from the project's blog array
        project.blog.splice(blogIndex, 1);

        // Save the updated project document
        await project.save();

        res.status(200).json({
            message: 'Blog Deleted Successfully',
            project: project
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Blog', error });
    }
};

exports.updateBlog = async (req, res) => {
    const project_Id = req.params.project_Id;
    const blog_Id = req.params.blog_Id;

    try {
        // Retrieve the project document by its ID
        const project = await ProjectDetails.findOne({ _id: project_Id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Find the index of the blog in the project's blog array
        const blogIndex = project.blog.findIndex((blog) => blog._id == blog_Id);

        if (blogIndex === -1) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if a blog with the updated heading already exists
        const existingBlog = project.blog.find(
            (blog, index) => index !== blogIndex && blog.BlogHeading === req.body.BlogHeading
        );

        if (existingBlog) {
            return res.status(400).json({ message: 'Blog with the same Heading already exists' });
        }

        // Update the blog fields
        project.blog[blogIndex].BlogDate = req.body.BlogDate;
        project.blog[blogIndex].BlogHeading = req.body.BlogHeading;
        project.blog[blogIndex].BlogDescription = req.body.BlogDescription;
        project.blog[blogIndex].BlogDescription1 = req.body.BlogDescription1;
        project.blog[blogIndex].BlogDescription2 = req.body.BlogDescription2;
        project.blog[blogIndex].BlogDescription3 = req.body.BlogDescription3;
        project.blog[blogIndex].BlogAuthor = req.body.BlogAuthor;
        project.blog[blogIndex].BlogTitleUrl = req.body.BlogTitleUrl;
        project.blog[blogIndex].BlogPageTitle = req.body.BlogPageTitle;
        project.blog[blogIndex].BlogMetaTitle = req.body.BlogMetaTitle;
        project.blog[blogIndex].BlogMetaKeyword = req.body.BlogMetaKeyword;
        project.blog[blogIndex].BlogMetaDescription = req.body.BlogMetaDescription;

        await project.save();

        res.status(200).json({
            message: 'Blog Updated Successfully',
            project: project
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Blog', error });
    }
};

exports.addOrUpdateProjectVideo = async (req, res) => {
    const projectId = req.params.id;
    const category_Id = req.params.Category_Id;
    const project_Id = req.params.project;
    const { ProjectVideo } = req.body;

    try {
        const superAdminProject = await ProjectDetails.findOne({ _id: projectId });

        if (!superAdminProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const projectCategory = superAdminProject.projectCategory.id(category_Id);

        if (!projectCategory) {
            return res.status(404).json({ message: 'Project Category not found' });
        }

        const projectItem = projectCategory.projects.id(project_Id);

        if (!projectItem) {
            return res.status(404).json({ message: 'Project Item not found' });
        }

        // Add or update gmapUrl in the project
        projectItem.ProjectVideo = ProjectVideo;

        await superAdminProject.save(); // Save the updated project details

        return res.json({ message: 'Added Successfully' });

    } catch (error) {
        console.error('Error adding or updating', error);
        return res.status(500).json({ error: 'Failed to add or update in the project' });
    }
};
