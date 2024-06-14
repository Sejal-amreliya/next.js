import { Controller, Post, Get, Put, Delete, Body, Param, Res } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PdfService } from './services/pdf.service';
import { User } from './entities/user.entity';
import { Response } from 'express';

@Controller('api')
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly pdfService: PdfService,
  ) {}

  @Post('users')
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.addUser(user);
  }

  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('users/:id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: any, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Get('pdf')
  async getPdf(@Res() res: Response): Promise<void> {
    const users = await this.userService.getUsers();
    const pdfBuffer = await this.pdfService.generatePdf(users);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="users.pdf"',
    });
    res.send(pdfBuffer);
  }
}
