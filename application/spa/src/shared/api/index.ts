import { Block } from "./Block";
import { LaunchUserProblem } from "./LaunchUserProblem";
import { ILeaderboard } from "./Leaderboard";
import { Problems } from "./Problems";
import { Token } from "./Token";
import { ITournament } from "./Tournament";
import { Users } from "./Users";
import { UsersProblem } from "./UsersProblem";
import { UsersTournament } from "./UsersTournament";
import { ApiConfig } from "./http-client";

/** API MCC. */
export class apiClientClass {
  constructor(config: ApiConfig) {
    this.Token = new Token(config);
    this.Problems = new Problems(config);
    this.Tournament = new ITournament(config);
    this.Users = new Users(config);
    this.UsersProblem = new UsersProblem(config);
    this.UsersTournament = new UsersTournament(config);
    this.Leaderboard = new ILeaderboard(config);
    this.Block = new Block(config);
    this.LaunchUserProblem = new LaunchUserProblem(config);
  }

  /** Настройки системы. */
  public Token: Token;

  /** Работа с заказчиками. */
  public Problems: Problems;

  /** Работа с gitlab. */
  public Tournament: ITournament;

  /** Работа с отделами. */
  public Users: Users;

  /** Праздники. */
  public UsersProblem: UsersProblem;

  /** Опции выпадающих списков. */
  public UsersTournament: UsersTournament;

  public Leaderboard: ILeaderboard;

  public Block: Block;

  public LaunchUserProblem: LaunchUserProblem;
}

export * from "./data-contracts";
