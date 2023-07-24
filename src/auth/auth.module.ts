import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: '7MBHJ0G#p1R2b@s4YphV8He#b*5M%4Gt',
    }),
    UserModule,
    PrismaModule,
    // AuthGuard,
  ],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService],
})
export class AuthModule {}
