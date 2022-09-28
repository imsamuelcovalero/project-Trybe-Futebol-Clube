import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './team';

class Matche extends Model {
  id!: number;
  homeTeam!: string;
  homeTeamGoals!: number;
  awayTeam!: string;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matche.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    underscored: true,
    timestamps: false,
  },
);

Matche.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });
Matche.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });
Team.hasMany(Matche, { foreignKey: 'homeTeam', as: 'homeTeam' });
Team.hasMany(Matche, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Matche;