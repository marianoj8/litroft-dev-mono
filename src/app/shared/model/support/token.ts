import { User } from '../User';

export class Token {
  constructor(
    public readonly accountId: number,
    public readonly token: string,
    public readonly expiration: string,
    public readonly accessType: string,
    public readonly user: User) {

  }

}
