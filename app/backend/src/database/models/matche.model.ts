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

MatcheModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatcheModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });
TeamModel.hasMany(MatcheModel, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamModel.hasMany(MatcheModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatcheModel;
