const WebsiteModal = require('../Model/Banner');

exports.addWebsiteBanner = async (req, res) => {
    const file = req.file;
    const { id, BannerName, bannerStatus } = req.body;

    // Logging to check the values
    console.log('Request file:', file);
    console.log('Request body:', req.body);

    if (!BannerName) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        const website = new WebsiteModal({
            id: id,
            BannerName: BannerName,
            bannerStatus: bannerStatus,
            WebsiteBanner: file.path,
        });

        await website.save();

        res.json({ message: 'Banner Photo Added Successfully' });
    } catch (error) {
        console.error('Error Adding Banner Photo:', error);
        res.status(500).json({ message: 'Failed to add Banner Photo', error: error.message });
    }
};

exports.getAllWebsiteBanners = async (req, res) => {
    const _id = req.params._id;

    try {
        const userBanners = await WebsiteModal.find({ id: _id, bannerStatus: 'Active' });

        if (userBanners.length > 0) {
            res.status(200).json(userBanners);
        } else {
            res.status(404).json({ message: 'No active banners found for the specified user ID' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving banners', error });
    }
};

exports.deleteWebsiteBanners = async (req, res) => {
    const _id = req.params._id;
  
    try {
      const deletedBanner = await WebsiteModal.findByIdAndDelete(_id);
  
      if (deletedBanner) {
        res.status(200).json({ message: 'Banner deleted successfully' });
      } else {
        res.status(404).json({ message: 'Banner not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting banner', error });
    }
  };
