import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login-dto';
import { UserDto } from 'src/dto/user-dto';
import { User } from 'src/schemas/users.schema';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(userData: LoginDto): Promise<User> {
    const user = await this.userService.findByEmail(userData.email);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        userData.password,
        user.password,
      );
      if (isPasswordMatching) {
        return user;
      }
    }
    throw new HttpException('Credenciales incorrectas', HttpStatus.BAD_REQUEST);
  }

  public async login(user: LoginDto): Promise<any | { status: number }> {
    return this.validate(user).then((userData) => {
      if (!userData) {
        return { status: 404 };
      }
      const payload = `${userData.username}`;
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 3600,
        access_token: accessToken,
        user_id: payload,
        status: 200,
      };
    });
  }

  public async register(user: UserDto): Promise<any> {
    const createdUser = await this.userService.create(user);
    createdUser.password = undefined;
    return createdUser;
  }
}
