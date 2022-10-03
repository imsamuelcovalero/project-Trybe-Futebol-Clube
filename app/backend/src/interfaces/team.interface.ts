// Essa interface NÃO foi usada no projeto
export interface ITeam {
  id: number;
  teamName: string;
}

export interface TeamController {
  create(): Promise<ITeam>;
  getAllTeams(): Promise<ITeam[]>;
  getTeamById(id: number): Promise<ITeam>;
  update(id: number): Promise<ITeam>;
  delete(id: number): Promise<ITeam>;
}
