import express from 'express';
import multer from 'multer';
import { 
  generateImage, 
  removeText, 
  replaceBackground, 
  upscaleImage 
} from '../controllers/imageController.js';
import userAuth from '../middlewares/auth.js';

const imageRouter = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 30 * 1024 * 1024, // 30MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'), false);
    }
  }
});

// Existing route
imageRouter.post('/generate-image', userAuth, generateImage);

// New routes
imageRouter.post('/remove-text', userAuth, upload.single('image'), removeText);
imageRouter.post('/replace-background', userAuth, upload.single('image'), replaceBackground);
imageRouter.post('/upscale-image', userAuth, upload.single('image'), upscaleImage);

export default imageRouter;