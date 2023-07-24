import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken({ id, email, name }: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id,
          email,
          name,
        },
        {
          expiresIn: '1d',
          algorithm: 'HS256',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token.');
    }
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password is wrong.');
    }

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email is wrong.');
    }

    // TODO: Send email to user with reset link.

    return true;
  }

  async reset(password: string, token: string) {
    // const user = await this.prismaService.user.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     password,
    //   },
    // });
    // return this.createToken(user);
  }
}
