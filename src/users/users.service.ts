import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, GetUserDto, UpdateUserDto } from './definitions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  public async createUser(user: CreateUserDto): Promise<GetUserDto> {
    return this.usersRepository.save(user);
  }

  public async listUsers(): Promise<GetUserDto[]> {
    return this.usersRepository.find();
  }

  public async getUserById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id [${id}] doesn't exist.`);
    }
    return user;
  }

  public async updateUser(id: number, user: UpdateUserDto): Promise<GetUserDto> {
    await this.getUserById(id);
    const updateUserData: User = this.usersRepository.create({ ...user, id });
    return this.usersRepository.save(updateUserData);
  }
}
