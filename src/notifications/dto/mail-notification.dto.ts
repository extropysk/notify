import { IsObject } from 'class-validator'
import { ObjectId } from 'mongodb'
import { IsObjectId, ToObjectId } from 'src/db/decorators/is-object-id.decorator'
import { NotificationDto } from 'src/notifications/dto/notification.dto'

export class MailNotificationDto extends NotificationDto {
  @IsObjectId()
  @ToObjectId()
  templateId: ObjectId

  @IsObject()
  content: Record<string, unknown>
}
