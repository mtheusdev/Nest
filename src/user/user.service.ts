import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePartialUserDto } from './dto/update-partial.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name }: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email,
        name,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async find(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    await this.UserExists(id);
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async updatePartial(id: number, data: UpdatePartialUserDto) {
    await this.UserExists(id);

    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.UserExists(id);

    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async UserExists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: { id },
      }))
    )
      throw new NotFoundException('User not found');
  }
}
