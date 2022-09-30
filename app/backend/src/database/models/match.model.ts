import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './team.model';

class MatchModel extends Model {
  id!: number;
  homeTeam!: string;
  homeTeamGoals!: number;
  awayTeam!: string;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

MatchModel.init(
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

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });
TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeam', as: 'matchHome' });
TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeam', as: 'matchAway' });

export default MatchModel;
