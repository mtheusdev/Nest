import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  // UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePartialUserDto } from './dto/update-partial.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
// import { LogInterceptor } from 'src/interceptors/log.interceptor';

// @UseInterceptors(LogInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async find(@ParamId() id: number) {
    return await this.userService.find(id);
  }

  @Put(':id')
  async update(@ParamId() id: number, @Body() body: UpdateUserDto) {
    return await this.userService.update(id, body);
  }

  @Patch(':id')
  async patch(@ParamId() id: number, @Body() body: UpdatePartialUserDto) {
    return await this.userService.updatePartial(id, body);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.userService.delete(id);
  }
}
