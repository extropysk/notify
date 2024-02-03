import { IsString } from 'class-validator'
import { NotificationDto } from 'src/notifications/dto/notification.dto'

export class WebNotificationDto extends NotificationDto {
  @IsString()
  body: string
}
