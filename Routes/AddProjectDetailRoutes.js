const express = require('express');
const ProjectDetail = require('../Controller/ProjectDetails');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Blog_Image');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const upload = multer({ storage });


router.post('/addGMapUrl/:id/:Category_Id/:project', ProjectDetail.addOrUpdateGMapUrl);
router.post('/addFaQ/:id/:Category_Id/:project', ProjectDetail.addFaQ);
router.delete('/deleteFaQ/:id/:Category_Id/:project/:faqId', ProjectDetail.deleteFaQ);
router.post('/AddYoutubeVideos/:id/:Category_Id/:project', ProjectDetail.addOrUpdateYoutubeVideo);
router.delete('/deleteVideo/:id/:Category_Id/:project/:videoId', ProjectDetail.deleteYotubeVideos);
router.delete('/deleteProjects/:id/categories/:Category_Id/projects/:project', ProjectDetail.deleteProject);


router.post('/AddBlog/:project_Id', ProjectDetail.addBlog);
router.post('/Blog/:Project_Id/:Blog_Id/BlogImage', upload.single('BlogImage'), ProjectDetail.addBlogImage);
router.delete('/deleteBlog/:project_Id/blogs/:blog_Id', ProjectDetail.deleteBlog);
router.post('/UpdateBlog/:project_Id/blogs/:blog_Id', ProjectDetail.updateBlog);

router.post('/AddProjectVideos/:id/:Category_Id/:project', ProjectDetail.addOrUpdateProjectVideo);

module.exports = router;
