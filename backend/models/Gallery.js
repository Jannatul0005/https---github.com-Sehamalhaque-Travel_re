// Gallery.js

import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  mediaType: {
    type: String,
    required: true,
    enum: ['image', 'video'],
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  placeName: {
    type: String,
    required: true,
  },
  uploader: {
    type: String,
    required: true,
  },
  uploadTime: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  replies: {
    type: [String],
    default: [],
  },
});


export default mongoose.model("Gallery", gallerySchema);
