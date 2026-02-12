import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/database/database.service";
import { SignInUserDTO } from "./dto/signInUser";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterUserDTO } from "./dto/registerUser";
import * as bcrypt from 'bcrypt'; 
import { UserService } from "src/user/user.service";

@Injectable()

export class AuthService {
    constructor(private readonly jwt: JwtService, private readonly userService: UserService){}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  // 2. Сравнение пароля при логине
  async validateUser(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
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
    const isPasswordValid = await bcrypt.compare(login.password, user.password);

    if (!isPasswordValid) {
         throw new UnauthorizedException('Неверный email или пароль');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
     return { access_token: await this.jwt.signAsync(payload) };

    }


    

}





