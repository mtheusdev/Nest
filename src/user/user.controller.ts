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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePartialUserDto } from './dto/update-partial.dto';

@Controller('user')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDto) {
    return { body };
  }

  @Get()
  async findAll() {
    return [];
  }

  @Get(':id')
  async find(@Param('id') id) {
    return { id };
  }

  @Put(':id')
  async update(@Param('id') id, @Body() body: UpdateUserDto) {
    return { id, body };
  }

  @Patch(':id')
  async patch(@Param('id') id, @Body() body: UpdatePartialUserDto) {
    return { id, body };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return { id };
  }
}
