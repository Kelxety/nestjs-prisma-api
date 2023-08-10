import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(createAuthDto: Partial<LoginDto>): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email: createAuthDto.email },
    });

    if (!user) {
      throw new NotFoundException(`User with email of ${createAuthDto.email}`);
    }

    const isPasswordValid = await bcrypt.compare(
      createAuthDto.hashedPassword,
      user.hashedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is incorrect!');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
