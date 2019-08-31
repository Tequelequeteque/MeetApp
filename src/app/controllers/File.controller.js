import { Router } from 'express';
import multer from 'multer';

import File from '../models/File.model';
import multerConfig from '../../config/multer.config';

const upload = multer(multerConfig);

class FileController {
  constructor() {
    this.routes = Router();

    this.routes.post('/files', upload.single('file'), this.store);
  }

  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path
    });

    return res.json(file);
  }
}

export default new FileController().routes;
