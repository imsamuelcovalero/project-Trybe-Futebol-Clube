import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './team.model';

class MatcheModel extends Model {
  id!: number;
  homeTeam!: string;
  homeTeamGoals!: number;
  awayTeam!: string;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

MatcheModel.init(
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

MatcheModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'homeTeam' });
MatcheModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'awayTeam' });
TeamModel.hasMany(MatcheModel, { foreignKey: 'homeTeam', as: 'homeTeam' });
TeamModel.hasMany(MatcheModel, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default MatcheModel;
