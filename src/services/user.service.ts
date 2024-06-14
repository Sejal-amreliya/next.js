import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // Method to add a new user to the database
  async addUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  // Method to get all users from the database
  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Method to get a single user by ID from the database
  async getUser(id:any): Promise<User> {
    return this.userRepository.findOne(id);
  }

  // Method to update a user in the database
  async updateUser(id: any, user: User): Promise<User> {
    // Finding the existing user
    const existingUser = await this.userRepository.findOne({ where: { id } }); 
    if (!existingUser) {
      throw new Error('User not found');
    }
  
    // Update the existing user object with the new values
    Object.assign(existingUser, user);
  
    // Save the updated user object
    await this.userRepository.save(existingUser);
  
    return existingUser;
  }

  // Method to delete a user from the database
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
