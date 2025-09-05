import axios from 'axios';
import FormData from 'form-data';
import userModel from '../models/userModel.js';

export const generateImage = async (req, res) => {
  // console.log(' generateImage route hit');
  // console.log(' req.user:', req.user);
  // console.log('req.body:', req.body);

  const userId = req.user?.id;
  const prompt = req.body?.prompt;

  if (!userId || !prompt) {
    return res.json({ success: false, message: 'Missing details' });
  }

  try {
    const user = await userModel.findById(userId);
    // console.log(' user:', user);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: 'No credit balance',
        creditBalance: user.creditBalance,
      });
    }

    // 🔗 call ClipDrop
    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          ...formData.getHeaders(),         
          'x-api-key': process.env.CLIPDROP_API,
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;


    // 💳 decrement credit & save
    user.creditBalance -= 1;
    await user.save();

    res.json({
      success: true,
      message: 'Image generated',
      creditBalance: user.creditBalance,
      resultImage,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



// Text Removal Feature
export const removeText = async (req, res) => {
  const userId = req.user?.id;
  
  if (!userId || !req.file) {
    return res.json({ success: false, message: 'Missing user ID or image file' });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: 'No credit balance',
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append('image_file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    const { data } = await axios.post(
      'https://clipdrop-api.co/remove-text/v1',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'x-api-key': process.env.CLIPDROP_API,
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Decrement credit & save
    user.creditBalance -= 1;
    await user.save();

    res.json({
      success: true,
      message: 'Text removed successfully',
      creditBalance: user.creditBalance,
      resultImage,
    });
  } catch (error) {
    console.error('Remove text error:', error);
    res.json({ success: false, message: error.message });
  }
};

// Replace Background Feature
export const replaceBackground = async (req, res) => {
  const userId = req.user?.id;
  const prompt = req.body?.prompt || '';
  
  if (!userId || !req.file) {
    return res.json({ success: false, message: 'Missing user ID or image file' });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: 'No credit balance',
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append('image_file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });
    formData.append('prompt', prompt);

    const { data } = await axios.post(
      'https://clipdrop-api.co/replace-background/v1',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'x-api-key': process.env.CLIPDROP_API,
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Decrement credit & save
    user.creditBalance -= 1;
    await user.save();

    res.json({
      success: true,
      message: 'Background replaced successfully',
      creditBalance: user.creditBalance,
      resultImage,
    });
  } catch (error) {
    console.error('Replace background error:', error);
    res.json({ success: false, message: error.message });
  }
};

// Image Upscaling Feature
export const upscaleImage = async (req, res) => {
  const userId = req.user?.id;
  const { target_width, target_height } = req.body;
  
  if (!userId || !req.file || !target_width || !target_height) {
    return res.json({ success: false, message: 'Missing required fields' });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: 'No credit balance',
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append('image_file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });
    formData.append('target_width', target_width);
    formData.append('target_height', target_height);

    const { data } = await axios.post(
      'https://clipdrop-api.co/image-upscaling/v1/upscale',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'x-api-key': process.env.CLIPDROP_API,
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/jpeg;base64,${base64Image}`;

    // Decrement credit & save
    user.creditBalance -= 1;
    await user.save();

    res.json({
      success: true,
      message: 'Image upscaled successfully',
      creditBalance: user.creditBalance,
      resultImage,
    });
  } catch (error) {
    console.error('Upscale image error:', error);
    res.json({ success: false, message: error.message });
  }
};