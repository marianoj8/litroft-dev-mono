import { User } from '../User';

export class Token {
  constructor(
    public accountId: number,
    public token: string,
    public expiration: string,
    public accessType: string,
    public user: User) {

  }

}
