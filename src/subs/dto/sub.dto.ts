import { Type } from 'class-transformer'
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator'

class Keys {
  @IsNotEmpty()
  p256dh: string

  @IsNotEmpty()
  auth: string
}

export class CreateSubDto {
  @IsNotEmpty()
  endpoint: string

  @IsObject()
  @ValidateNested()
  @Type(() => Keys)
  keys: Keys
}
