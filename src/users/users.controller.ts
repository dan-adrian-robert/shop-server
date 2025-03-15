import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from '../auth/dto/user.dto';
import { UsersService } from './users.service';
import { UserLoginDto } from '../auth/dto/user.login.dto';


@Controller('user')
export class UsersController {
  constructor(private service: UsersService) {
  }

  @Post('/create')
  createUser(
    @Body() body: UserDto
  ) {
    return this.service.createUser(body)
  }

  @Get('/list')
  listUsers() {
    return this.service.getUsers()
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: number) {
    return this.service.deleteUserById(id)
  }

  @Put('/:id')
  updateUserById(@Param('id') id: number, @Body() body: UserDto) {
    return this.service.updateUserData(id, body)
  }

  @Post('/validate')
  validateUser(@Body() body: UserLoginDto) {
    const {name, password} = body;
    return this.service.validateUser(name, password)
  }
}
