import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
     private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto) {
    const { correo, password } = user;

    const userExists = await this.userRepository.findOne({ where: { correo } });
    if (userExists) {
      throw new Error('El correo ya está registrado');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = this.userRepository.create({
      correo,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);

    // Remueve la password antes de devolver
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async validateUser(correo: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { correo } });
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) return user;

    return null;
  }

   async login(userDto: CreateUserDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(userDto.correo, userDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { correo: user.correo, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
