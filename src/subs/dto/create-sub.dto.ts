import { IsEmail } from 'class-validator'

export class CreateSubDto {
  @IsEmail()
  email: string
}
