import { Body, Controller, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto } from './dto/login.dto';

@Controller('user')
export class LoginController {
  constructor(private readonly userService: LoginService) {}

  @Post("register")
  async register(@Body() user: CreateUserDto) {
    return this.userService.register(user);
  }

  @Post("login")
  async login( @Body() user: CreateUserDto ) {
      
    return this.userService.login(user);
  }
}
