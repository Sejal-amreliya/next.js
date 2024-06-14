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

  // Endpoint to create a new user
  @Post('users')
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.addUser(user);
  }

  // Endpoint to get all users
  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  // Endpoint to get a single user by ID
  @Get('users/:id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  // Endpoint to update a user by ID
  @Put('users/:id')
  async updateUser(@Param('id') id: any, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  // Endpoint to delete a user by ID
  @Delete('users/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }

  // Endpoint to generate and download a PDF of all users
  @Get('pdf')
  async getPdf(@Res() res: Response): Promise<void> {
    // Get all users from the database
    const users = await this.userService.getUsers();
    // Generate a PDF buffer from the users data
    const pdfBuffer = await this.pdfService.generatePdf(users);
    // Set the response headers for downloading the PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="users.pdf"',
    });
    // Send the PDF buffer as the response
    res.send(pdfBuffer);
  }
}
