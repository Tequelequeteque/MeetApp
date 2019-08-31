import Sequelize from 'sequelize';
import configDatabase from '../config/database.config';

import User from '../app/models/User.model';
import File from '../app/models/File.model';
import Meetup from '../app/models/Meetup.model';
import Subscription from '../app/models/Subscription.model';

const models = [User, File, Meetup, Subscription];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDatabase);
    this.Sequelize = Sequelize;

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
