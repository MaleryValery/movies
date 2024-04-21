import logger from '../utils/logger.js';

import cloudinaryService from './service.js';

const getImageByID = async (req, res) => {
  logger.info(`Received request to get image:`, req.params.publicId);
  const data = await cloudinaryService.getAssetInfo(req.params.publicId);
  if (!data) {
    return res.status(404).send('Image not found');
  }
  res.send({ url: data.secure_url, publicId: data.public_id });
};

const addNewImage = async (req, res) => {
  logger.info(JSON.stringify({ body: req.body, file: req.file }));
  logger.info(`Received request to upload image: ${req.file.originalname}`);
  // upload to cloudinary
  const result = await cloudinaryService.uploadImage(req.file.path, '');
  if (!result) {
    return res.status(500).send('Image upload failed');
  }
  res.send(result);
  return result.url;
};

export default {
  addNewImage,
  getImageByID,
};
