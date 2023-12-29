const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;
const MongoDb_Url = mongodb://localhost:27017';
const path = require('path');


app.use(bodyParser.json());
app.use(cors());

mongoose.connect(MongoDb_Url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });


const dashboardRoute = require('./Routes/dashboardRoute');
const AdminRoutes = require('./Routes/AdminRoutes');
const SuperAdminProjectRoute = require('./Routes/SuperAdminProjectRoute');
const BannerRoute = require('./Routes/BannerRoutes');
const ProjectGallery = require('./Routes/AddProjectGallery');
const ProjectDetailRoute = require('./Routes/AddProjectDetailRoutes');
const EnquiryRoute = require('./Routes/EnquiryRoutes');
const CareerRoute = require('./Routes/CareerRoutes');
const RecentRoute = require('./Routes/RecentProjects');
const CareerAdminRoutes = require('./Routes/CareerAdminRoutes');
const MediaGalleryRoutes = require('./Routes/MediaRoutes');
const MediaGalleryItemRoutes = require('./Routes/MediaGalleryRoutes');
const MemberRoutes = require('./Routes/MemberRoutes');
const MettaRoutes = require('./Routes/MettaRoutes');

app.use('/api', AdminRoutes);
app.use('/api', dashboardRoute);
app.use('/api', SuperAdminProjectRoute);
app.use('/api', BannerRoute);
app.use('/api', ProjectGallery);
app.use('/api', ProjectDetailRoute);
app.use('/api', EnquiryRoute);
app.use('/api', CareerRoute);
app.use('/api', RecentRoute);
app.use('/api', CareerAdminRoutes);
app.use('/api', MediaGalleryRoutes);
app.use('/api', MediaGalleryItemRoutes);
app.use('/api', MemberRoutes);
app.use('/api', MettaRoutes);

app.use('/api/Banner_Photo', express.static(path.join(__dirname, 'Banner_Photo')));
app.use('/api/Project_Category_Thumbnail', express.static(path.join(__dirname, 'Project_Category_Thumbnail')));
app.use('/api/Project_Galley', express.static(path.join(__dirname, 'Project_Galley')));
app.use('/api/Blog_Image', express.static(path.join(__dirname, 'Blog_Image')));
app.use('/api/Media_Galley', express.static(path.join(__dirname, 'Media_Galley')));

app.use('/api/Media_Gallery_Items', express.static(path.join(__dirname, 'Media_Gallery_Items')));
app.use('/api/Member_List', express.static(path.join(__dirname, 'Member_List')));
app.use('/api/Career_Resume', express.static(path.join(__dirname, 'Career_Resume')));


app.get('/', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
