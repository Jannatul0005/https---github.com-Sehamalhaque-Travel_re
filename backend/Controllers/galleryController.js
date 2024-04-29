// galleryController.js


import Gallery from "../models/Gallery.js"

// Function to upload media
exports.uploadMedia = async (req, res) => {
  try {
    const { mediaType, mediaUrl, location, placeName, uploader } = req.body;

    // Create a new Gallery object
    const newMedia = new Gallery({
      mediaType,
      mediaUrl,
      location,
      placeName,
      uploader,
    });

    // Save the new media to the database
    const savedMedia = await newMedia.save();

    res.status(201).json(savedMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all media
exports.getAllMedia = async (req, res) => {
  try {
    const allMedia = await Gallery.find();

    res.json(allMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
