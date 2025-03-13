import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../auth/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUsers(): Promise<object> {
    return Promise.resolve(this.userRepository.find())
  }

  async createUser(user: UserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);

    try {
      return  await this.userRepository.save(newUser);
    } catch (error) {
      const {detail} = error;
      throw new UnauthorizedException(detail);
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Update user data
  async updateUserData(id: number, updateUserDto: UserDto): Promise<UserEntity> {
    console.log(id, updateUserDto);
    try {
      await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return this.getUserById(id);
  }

  // Delete user by ID
  async deleteUserById(id: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: `User with ID ${id} deleted successfully` };
  }
}
