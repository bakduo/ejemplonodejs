import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from 'src/dto/login-dto';
import { UserDto } from 'src/dto/user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDto): Promise<any> {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: UserDto): Promise<any> {
    return this.authService.register(user);
  }
}
