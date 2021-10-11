import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user-dto';
import { User, UserDocument } from 'src/schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.model.findOne({ email: email }).exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  }

  async create(createUserDto: UserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      bcrypt.genSaltSync(10),
      null,
    );

    const usercustom = {
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    };

    return await new this.model({
      ...usercustom,
    }).save();
  }

  async update(id: string, updateUserDto: UserDto): Promise<User> {
    return await this.model.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
