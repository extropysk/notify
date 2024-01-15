import { IsOptional, IsString } from 'class-validator'

export class PushNotificationDto {
  @IsString()
  subject: string

  @IsOptional()
  @IsString()
  body: string

  @IsString()
  recipientId: string
}
