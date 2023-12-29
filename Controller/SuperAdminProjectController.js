const SuperAdminProjectModel = require('../Model/SuperAdminProjectModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerProject = async (req, res) => {
  const {
    id,
    projectName,
    projectOwnerName,
    phone,
    email,
    city,
    zip,
    address,
    username,
    password,
    status,
  } = req.body;

  try {
    // Check if a project with the same name, phone, or email already exists
    const existingProject = await SuperAdminProjectModel.findOne({
      $or: [
        { projectName },
        { phone },
        { email },
      ],
    });

    if (existingProject) {
      return res.status(400).json({ message: 'Project already exists with these details' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const registerProject = new SuperAdminProjectModel({
      id,
      projectName,
      projectOwnerName,
      phone,
      email,
      city,
      zip,
      address,
      username,
      password: hashedPassword,
      status,
    });

    await registerProject.save();

    // Generate a JWT token for the registered user
    const token = jwt.sign({ username, email }, '123ABCDZYx', { expiresIn: '1h' });

    res.json({
      message: 'Project Added Successfully',
      token,
    });
  } catch (error) {
    console.error('Error registering project:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.loginProject = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await SuperAdminProjectModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token for the authenticated user with the actual user ID from the database
    const token = jwt.sign({ userId: user._id }, '123ABCD123ZYxyz', { expiresIn: '1h' });

    res.status(200).json({
      userId: user._id, // Send the actual user ID
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getallProjects = async (req, res) => {
  try {
    const projects = await SuperAdminProjectModel.find().select('-username -password, -id');
    if (projects && projects.length > 0) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: 'No Proejcts found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Proejcts', error });
  }
};

exports.deleteProperty = async (req, res) => {
  const _id = req.params._id;
  try {
    const deleteProject = await SuperAdminProjectModel.findByIdAndDelete(_id);
    if (deleteProject) {
      res.status(200);
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting', error });
  }
};

exports.viewProject = async (req, res) => {
  const _id = req.params._id;
  try {
    const project = await SuperAdminProjectModel.findOne({ _id, status: 'Active' }).select('-password -username -status');

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json('Not Found !!!');
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

exports.addProjectCategory = async (req, res) => {
  const project_Id = req.params.project_Id;

  try {
    // Retrieve the project document by its ID
    const project = await SuperAdminProjectModel.findOne({ _id: project_Id });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if a project category with the same name already exists
    const existingProjectCategory = project.projectCategory.find(
      (category) => category.projectCategoryName === req.body.projectCategoryName
    );

    if (existingProjectCategory) {
      return res.status(400).json({ message: 'Project category with the same name already exists' });
    }

    // Create a new project category using the projectCategorySchema
    const newProjectCategory = {
      projectCategoryName: req.body.projectCategoryName,
      projectCategoryDescription: req.body.projectCategoryDescription,
      projectCategoryStatus: req.body.projectCategoryStatus
    };

    // Push the new project category into the project's projectCategory array
    project.projectCategory.push(newProjectCategory);

    // Save the updated project document
    await project.save();

    res.status(201).json({
      message: 'Project category added to the project successfully',
      project: project
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding project category', error });
  }
};

exports.deleteProjectCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const projectId = req.params.projectId;

  try {
    // Use findOneAndUpdate to update and remove the specific day detail
    const updatedProject = await SuperAdminProjectModel.findOneAndUpdate(
      { _id: projectId },
      {
        $pull: {
          projectCategory: { _id: categoryId }
        }
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({
      message: 'Project Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Project Category', error });
  }
};


exports.addAmenityDetail = async (req, res) => {
  const id = req.params.Project_Id;

  try {
    const superAdminProject = await SuperAdminProjectModel.findOne({ _id: id });

    if (!superAdminProject) {
      return res.status(404).json({ message: 'Not Found' });
    }

    const {
      Project_Id,
      projectCategory,
      area,
      projectName,
      clientName,
      location,
      projectStatus,
      projectPublishedDate,
      status,
      projectDescription, // Corrected field name
      category_Id,
      projectTitleUrl
    } = req.body;

    // Validate required fields
    if (
      !Project_Id ||
      !projectCategory ||
      !area ||
      !projectName ||
      !clientName ||
      !projectPublishedDate ||
      !category_Id ||
      !projectTitleUrl
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const dayDetail = superAdminProject.projectCategory.find(
      (detail) => detail.projectCategoryName === projectCategory
    );

    if (!dayDetail) {
      return res.status(404).json({ message: 'Category Not Found' });
    }

    const existingAmenityDetail = dayDetail.projects.find((amenity) => {
      return (
        amenity.Project_Id === Project_Id &&
        amenity.projectCategory === projectCategory &&
        amenity.area === area &&
        amenity.projectName === projectName &&
        amenity.clientName === clientName &&
        amenity.location === location &&
        amenity.projectStatus === projectStatus &&
        amenity.projectPublishedDate === projectPublishedDate &&
        amenity.projectDescription === projectDescription &&
        amenity.status === status &&
        amenity.category_Id === category_Id &&
        amenity.projectTitleUrl === projectTitleUrl
      );
    });

    if (existingAmenityDetail) {
      return res.status(200).json({
        message: 'Already Exists',
      });
    }

    const newAmenityDetail = {
      Project_Id,
      category_Id,
      area,
      projectCategory,
      projectName,
      clientName,
      location,
      projectStatus,
      projectPublishedDate,
      projectDescription,
      status,
      projectTitleUrl
    };

    dayDetail.projects.push(newAmenityDetail);

    await superAdminProject.save();

    res.status(201).json({ message: 'Added Successfully' });
  } catch (error) {
    console.error('Error adding:', error);
    res.status(500).json({ message: 'Error adding', error: error.message });
  }
};

exports.addProjectCategoryThumbnail = async (req, res) => {
  const Project_Id = req.params.Project_Id;
  const Category_Id = req.params.Category_Id;
  const { file } = req;
  const alt = req.body.alt; // Assuming alt is sent as part of the request body

  try {
    const Project = await SuperAdminProjectModel.findOne({ _id: Project_Id });

    if (!Project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Find the specific project category within the projectCategory array by its _id
    const ProjectCategory = Project.projectCategory.id(Category_Id);

    if (!ProjectCategory) {
      return res.status(404).json({ message: 'Project Category not found' });
    }

    // Check if a file is provided before updating the thumbnail
    if (file) {
      ProjectCategory.projectCategoryThumbnail = file.path;
      ProjectCategory.projectCategoryAlt = alt; // Assuming alt is a property in your frontend request

      await Project.save();

      return res.json({ message: 'Project Category Thumbnail Added Successfully' });
    } else {
      return res.status(400).json({ message: 'File not provided' });
    }
  } catch (error) {
    console.error('Error Adding Project Category Thumbnail:', error);
    return res.status(500).json({ error: 'Failed to add Project Category Thumbnail' });
  }
};


exports.addProjectGallery = async (req, res) => {
  const projectId = req.params.id;
  const category_Id = req.params.Category_Id;
  const project_Id = req.params.project;
  const file = req.file;
  const alt = req.body.alt;

  try {
    const superAdminProject = await SuperAdminProjectModel.findOne({ _id: projectId });

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

    if (file) {
      // Create a new gallery object with the image path
      const newGalleryItem = {
        image: file.path,
        galleryAltTitle: alt
      };
      // Corrected property name to galleryAlt

      // Add the new gallery item to the project's Gallery array
      projectItem.Gallery.push(newGalleryItem); // Corrected property name to gallery

      // Save the changes to the database
      await superAdminProject.save();

      return res.json({ message: 'Image added to the project gallery successfully' });
    } else {
      return res.status(400).json({ message: 'File not provided' });
    }

  } catch (error) {
    console.error('Error Adding Images:', error);
    return res.status(500).json({ error: 'Failed to add Images' });
  }
};


exports.deleteProjectGalleryItem = async (req, res) => {
  const projectId = req.params.id;
  const category_Id = req.params.Category_Id;
  const project_Id = req.params.project;
  const galleryItemId = req.params.galleryItemId; // assuming gallery item Id is being passed as a parameter

  try {
    const superAdminProject = await SuperAdminProjectModel.findOne({ _id: projectId });

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

    const galleryItem = projectItem.Gallery.id(galleryItemId);

    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery Item not found' });
    }

    const galleryIndex = projectItem.Gallery.findIndex((item) => item._id.toString() === galleryItemId);

    if (galleryIndex === -1) {
      return res.status(404).json({ message: 'Item not found, Please Refresh...' });
    }

    // Remove the Gallery item from the array
    projectItem.Gallery.splice(galleryIndex, 1);

    await superAdminProject.save();

    return res.json({ message: 'Image removed from the project gallery successfully', galleryItem });

  } catch (error) {
    console.error('Error Deleting Image:', error);
    return res.status(500).json({ error: 'Failed to delete image' });
  }
};

exports.getAllProjects1 = async (req, res) => {
  try {
    // Retrieve all projects with specified fields excluded (e.g., username, password, id)
    const projects = await SuperAdminProjectModel.find({}, { username: 0, password: 0, id: 0 });

    // Extract and merge all projects from different categories into a single array
    const allProjects = projects.reduce((accumulator, currentCategory) => {
      const categoryProjects = currentCategory.projectCategory.reduce((categoryAccumulator, project) => {
        return categoryAccumulator.concat(project.projects);
      }, []);

      return accumulator.concat(categoryProjects);
    }, []);

    res.status(200).json(allProjects);
  } catch (error) {
    console.error('Error fetching all projects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

