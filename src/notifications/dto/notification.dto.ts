import { IsString } from 'class-validator'

export class NotificationDto {
  @IsString()
  subject: string

  @IsString()
  recipientId: string
}
