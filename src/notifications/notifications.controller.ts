import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/core/decorators/auth.decorator'
import { MailNotificationDto } from 'src/notifications/dto/mail-notification.dto'
import { NotificationsService } from 'src/notifications/notifications.service'

@ApiTags('notifications')
@Controller('notifications')
@Auth()
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('mail')
  @ApiOperation({ summary: 'Send mail' })
  notifyMail(@Body() notification: MailNotificationDto) {
    return this.notificationsService.notifyMail(notification)
  }
}
