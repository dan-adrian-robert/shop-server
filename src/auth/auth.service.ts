import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  validateUser(username: string, password: string) {
    return Promise.resolve({username: username, password: password});
  }
}
