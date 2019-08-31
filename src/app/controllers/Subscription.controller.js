import { Router } from 'express';
import { Op } from 'sequelize';

import User from '../models/User.model';
import Meetup from '../models/Meetup.model';
import Subscription from '../models/Subscription.model';

import Queue from '../../lib/Queue.lib';
import SubscriptionMail from '../jobs/SubscriptionMail.job';

class SubscriptionController {
  constructor() {
    this.routes = Router();

    this.routes.get('/subscriptions', this.index);
    this.routes.post('/meetups/:meetupId/subscriptions', this.store);
  }

  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date()
            }
          },
          required: true
        }
      ],
      order: [[Meetup, 'date']]
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [User]
    });

    if (meetup.user_id === req.userId)
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups" });

    if (meetup.past)
      return res.status(400).json({ error: "Can't subscribe to past meetups" });

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date
          }
        }
      ]
    });

    if (checkDate)
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController().routes;
