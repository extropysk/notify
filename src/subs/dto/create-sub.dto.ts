import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsObject, IsOptional, ValidateNested } from 'class-validator'

class KeysDto {
  @IsNotEmpty()
  p256dh: string

  @IsNotEmpty()
  auth: string
}

class WebDto {
  @IsNotEmpty()
  endpoint: string

  @IsObject()
  @ValidateNested()
  @Type(() => KeysDto)
  keys: KeysDto
}

export class CreateSubDto {
  @IsEmail()
  email: string

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => KeysDto)
  web: WebDto
}
