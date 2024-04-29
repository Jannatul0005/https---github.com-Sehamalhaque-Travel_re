// gallerys.js
import express from 'express'

import { verifyUser } from '../utils/verifyToken.js'
import { galleryController } from '../Controllers/galleryController.js'
import { verifyUser } from '../utils/verifyToken.js'
import { verifyUser } from '../utils/verifyToken.js'
import { galleryController } from '../Controllers/galleryController.js'
import { verifyUser } from '../utils/verifyToken.js'




// Route to upload media
router.post('/upload',verifyUser, galleryController.uploadMedia);

// Route to get all media
router.get('/', galleryController.getAllMedia);

export default router
