require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const app = express();
app.use(cors());

/* ---------- AWS S3 CONFIG ---------- */
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/* ---------- Multer Setup ---------- */
const upload = multer({
  storage: multer.memoryStorage(), // store file in memory
});

/* ---------- Upload Route ---------- */
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    res.status(200).json({
      message: 'File uploaded successfully',
      fileName: uploadParams.Key,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

/* ---------- Start Server ---------- */
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
