import { Router } from 'express';
import Meetup from '../models/Meetup.model';

class OrganizingController {
  constructor() {
    this.routes = Router();

    this.routes.get('/organizing', this.index);
  }

  async index(req, res) {
    const meetups = await Meetup.findAll({ where: { user_id: req.userId } });

    return res.json(meetups);
  }
}

export default new OrganizingController().routes;
