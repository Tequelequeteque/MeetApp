import Sequelize, { Model } from 'sequelize';
import { hash, compare } from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        name: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) user.password_hash = await hash(user.password, 8);
    });

    return this;
  }

  checkPassword(password) {
    return compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Meetup, { foreignKey: 'user_id' });
    this.hasMany(models.Subscription, { foreignKey: 'user_id' });
  }
}

export default User;
