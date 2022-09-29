import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  id!: number;
  email!: string;
  password!: string;
  username!: string;
  role!: string;
}

UserModel.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    underscored: true,
    timestamps: false,
  },
);

export default UserModel;
