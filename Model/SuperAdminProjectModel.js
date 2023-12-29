
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    image: { type: String },
    galleryAltTitle: { type: String }
});

const YoutubeVideoGallerySchema = new mongoose.Schema({
    videoUrl: { type: String }
});


const FaQSchema = new mongoose.Schema({
    FaQqn: { type: String },
    FaQans: { type: String }
});

const project1Schema = new mongoose.Schema({
    Project_Id: { type: String },
    category_Id: { type: String },
    area: { type: String },
    projectCategory: { type: String },
    projectName: { type: String },
    clientName: { type: String },
    location: { type: String },
    projectStatus: { type: String },
    projectDescription: { type: String },
    projectPublishedDate: { type: Date },
    status: { type: String },
    Gallery: [gallerySchema],
    video: [YoutubeVideoGallerySchema],
    ProjectVideo: { type: String },
    gmapUrl: { type: String },
    FaQ: [FaQSchema],
    title: { type: String },
    metatitle: { type: String },
    keywords: { type: String },
    description: { type: String },
    projectTitleUrl: { type: String }
});

const RecentProjects = new mongoose.Schema({
    Project_Ids1: [String],
});

const projectCategorySchema = new mongoose.Schema({
    project_Id: { type: String },
    projectCategoryName: { type: String },
    projectCategoryDescription: { type: String },
    projectCategoryStatus: { type: String },
    projectCategoryThumbnail: { type: String },
    projectCategoryAlt: { type: String },
    projects: [project1Schema]
});

const blogSchema = new mongoose.Schema({
    project_Id: { type: String },
    BlogDate: { type: String },
    BlogHeading: { type: String },
    BlogHeading: { type: String },
    Category: { type: String },
    BlogDescription: { type: String },
    BlogDescription1: { type: String },
    BlogDescription2: { type: String },
    BlogDescription3: { type: String },
    BlogAuthor: { type: String },
    BlogImage: { type: String },
    BlogTitleUrl: { type: String },
    BlogPageTitle: { type: String },
    BlogMetaTitle: { type: String },
    BlogMetaKeyword: { type: String },
    BlogMetaDescription: { type: String }
});

const careersSchema = new mongoose.Schema({
    JobName: { type: String },
    JobExpirence: { type: String },
    JobDescription: { type: String },
    JobRole: { type: String },
    JobLocation: { type: String },
    ctcInfo: { type: String },
    status: { type: String }


});

const Gallery1Schema = new mongoose.Schema({
    images_id: [{ type: String }],  // Change is made here
});

const mediaCategorySchema = new mongoose.Schema({
    categoryName: { type: String },
    image: { type: String },
    Gallery1: [Gallery1Schema],
});

const addMemberSchema = new mongoose.Schema({
    fullName: { type: String },
    jobRole: { type: String },
    phone: { type: String },
    email: { type: String },
    status: { type: String },
    memberFile: { type: String }
});

const MettaSchema = new mongoose.Schema({
    page: { type: String },
    title: { type: String },
    metatitle: { type: String },
    keywords: { type: String },
    description: { type: String }
});



const projectSchema = new mongoose.Schema({
    id: { type: String },
    projectName: { type: String },
    projectOwnerName: { type: String },
    phone: { type: String },
    email: { type: String },
    city: { type: String },
    zip: { type: String },
    address: { type: String },
    username: { type: String },
    password: { type: String },
    status: { type: String },
    projectCategory: [projectCategorySchema],
    blog: [blogSchema],
    recentProject: [RecentProjects],
    Career: [careersSchema],
    Media: [mediaCategorySchema],
    Member: [addMemberSchema],
    Metta: [MettaSchema]
});

const SuperAdminProject = mongoose.model('SuperAdminProject', projectSchema);

module.exports = SuperAdminProject;