import { unlink } from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';
// import cloudinary from 'cloudinary';
import logger from '../utils/logger.js';
import { updateMovieImage } from '../movies/service.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAssetInfo = async (publicId) => {
  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    return await cloudinary.api.resource(publicId, options);
  } catch (error) {
    console.error(error);
  }
};

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    // folder: folderPath,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    logger.info(`Image uploaded successfully: ${JSON.stringify(result, null, 2)}`);
    await unlink(imagePath); // Delete the file after upload
    return result;
  } catch (error) {
    console.error(error);
    throw error; // Ensure error is propagated up, so the file is not deleted if upload fails
  }
};

// const uploadImage = async (movieId, imagePath, folderPath = '') => {
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//     folder: folderPath,
//   };

//   try {
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     logger.info(`Image uploaded successfully: ${JSON.stringify(result, null, 2)}`);
//     await unlink(imagePath); // Delete the file after upload
//     const url = result.secure_url;
//     updateMovieImage(movieId, url);
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw error; // Ensure error is propagated up, so the file is not deleted if upload fails
//   }
// };

const destroy = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    logger.error(error);
  }
};

export default {
  getAssetInfo,
  uploadImage,
  destroy,
};
