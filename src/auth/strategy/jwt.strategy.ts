import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SUPER_SECRET_KEY || 'asfoijoaisjfoiasjfoiaoisjjfoiasijf', // Тот же, что в модуле!
    });
  }

  async validate(payload: any) {
    // То, что ты вернешь здесь, попадет в req.user
    return { userId: payload.sub, email: payload.email };
  }
}