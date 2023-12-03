import { IsEnum, IsOptional, IsString } from 'class-validator'
import { NotificationType } from 'src/notifications/enums/notification-type.enum'

export class PushNotificationDto {
  @IsString()
  subject: string

  @IsOptional()
  @IsString()
  body: string

  @IsString()
  recipientId: string

  @IsOptional()
  @IsEnum(NotificationType)
  type = NotificationType.WEB
}
