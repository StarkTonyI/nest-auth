import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/database/database.service";
import { SignInUserDTO } from "./dto/signInUser";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterUserDTO } from "./dto/registerUser";
import * as bcrypt from 'bcrypt'; 
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.controller";
import { ConfigService } from "@nestjs/config";

@Injectable()

export class AuthService {
    constructor(private readonly jwt: JwtService, private readonly userService: UserService, private readonly config: ConfigService){}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  // 2. Сравнение пароля при логине
  async validateUser(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
  async refreshToken(refreshToken:string){
    if(!refreshToken) return null;
    
  }
  async getTokens(payload: { email:string, userId:string }){
    return {
      acess_token: await this.jwt.signAsync(payload),
      refresh_token: await this.jwt.signAsync(payload, { secret: this.config.getOrThrow('JWT_REFRESH_SECRET'), expiresIn:'7d' })
    }
  }
// В конструкторе только UserService и JwtService!
async register(dto: RegisterUserDTO) {
    const candidate = await this.userService.findByEmail(dto.email);
    if (candidate) throw new UnauthorizedException('User already exists');
    
    const hashedPassword = await this.hashPassword(dto.password);
    await this.userService.create({ ...dto, password: hashedPassword });
    
    return { message: 'Success' };
}
async login(login: SignInUserDTO){
    const user = await this.userService.findByEmail(login.email)
    if(!user) throw new UnauthorizedException;
    const isPasswordValid = await this.validateUser(login.password, user.password)

    if (!isPasswordValid) {
         throw new UnauthorizedException('Неверный email или пароль');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const refresh_token = await this.jwt.signAsync(payload, { secret:this.config.getOrThrow('JWT_REFRESH_SECRET'), expiresIn:'7d' })
    const hashRefreshToken = await this.hashPassword(refresh_token)
    await this.userService.saveToken(hashRefreshToken, user.id)
    return { access_token: await this.jwt.signAsync(payload), refresh_token  };
}
async refreshTokens(id: string){
    const user = await this.userService.findById(id);
    if(!user) throw new UnauthorizedException({message: "User no exist"})

    const payload = { userId: user.id, email: user.email }
    const tokens = await this.getTokens(payload);

    const jwtRefreshHash = await bcrypt.hash(tokens.refresh_token, 10);
    await this.userService.saveToken(jwtRefreshHash, id);

    return {
      refreshToken: tokens.refresh_token,
      acessToken: tokens.acess_token
    }
}
async logout(userId:string){
  const findUser = await this.userService.findById(userId);

  if(!findUser) throw new UnauthorizedException;

  await this.userService.destroyToken(userId)
  return { message:"Logged out successfully" }
}

}






