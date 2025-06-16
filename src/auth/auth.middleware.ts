import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { jwtConstants } from 'src/auth/constants/jwt.constants';

interface JwtPayload {
  username: string;
  name: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    const request = req.headers['authorization'];
    const token = request ? request.split(' ')[1] : null;

    if (!token) {
      throw new UnauthorizedException('No Token provided');
    }

    try {
      const decoded = this.jwtService.verify<JwtPayload>(token, {
        secret: jwtConstants.secret,
      });
      req['username'] = decoded.username;
    } catch {
      throw new UnauthorizedException('Invalid Token');
    }

    next();
  }
}
