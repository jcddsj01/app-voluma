// cloudinary é para upload e gerenciamento.
const cloudinary = require('cloudinary').v2;
// multer-storage-cloudinary integra o multer direto com o Cloudinary.
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// multer é para receber o arquivo no backend via form-data.
const multer = require('multer');
require('dotenv').config();

// Configure o Cloudinary com suas credenciais
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configura o storage do multer para enviar direto pro Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'livros', // pasta no Cloudinary para organizar as imagens
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };