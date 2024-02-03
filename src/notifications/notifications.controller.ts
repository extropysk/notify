import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/core/decorators/auth.decorator'
import { MailNotificationDto } from 'src/notifications/dto/mail-notification.dto'
import { WebNotificationDto } from 'src/notifications/dto/web-notification.dto'
import { NotificationsService } from 'src/notifications/notifications.service'

@ApiTags('notifications')
@Controller('notifications')
@Auth()
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('web')
  @ApiOperation({ summary: 'Push web notification' })
  notifyWeb(@Body() notification: WebNotificationDto) {
    return this.notificationsService.notifyWeb(notification)
  }

  @Post('mail')
  @ApiOperation({ summary: 'Send mail' })
  notifyMail(@Body() notification: MailNotificationDto) {
    return this.notificationsService.notifyMail(notification)
  }
}
