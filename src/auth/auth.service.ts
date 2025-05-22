import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({
    username,
    password,
  }: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findUsername(username);
    if (!user) throw new UnauthorizedException('User not found');

    const passwordValidated = await bcrypt.compare(password, user.password);

    if (!passwordValidated) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      name: user.name,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
