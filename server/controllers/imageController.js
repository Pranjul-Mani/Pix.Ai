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