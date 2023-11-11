import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, GetUserDto } from './definitions';

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
    return this.usersRepository.findOne({ where: { id } });
  }

  public async updateUser(id: number, user: Partial<CreateUserDto>): Promise<GetUserDto> {
    const existingUser: User = await this.getUserById(id);
    if (!existingUser) {
      throw new NotFoundException();
    }
    const updateUserData: User = this.usersRepository.create({ id, ...user });
    return this.usersRepository.save(updateUserData);
  }
}
