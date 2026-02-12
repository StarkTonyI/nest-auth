import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
     jwtFromRequest: (req) => {
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      console.log('Прилетел токен:', token); // ПОСМОТРИ В КОНСОЛЬ ТЕРМИНАЛА
      return token;
    },
      ignoreExpiration: false,
      secretOrKey: 'asfoijoaisjfoiasjfoiaoisjjfoiasijf', // Тот же, что в модуле!
    });
  }

  async validate(payload: any) {
    // То, что ты вернешь здесь, попадет в req.user
    return { userId: payload.sub, email: payload.email };
  }
}