import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(username: string, pass: string) {

    const validateResult =  await this.userService.validateUser(username, pass);
    const {password, name} = validateResult;
    return Promise.resolve({username: name, password});
  }

  async login(user) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginFlow(body:LoginDto) {
    const user = await this.validateUser(body.username, body.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.login(user);
  }
}
