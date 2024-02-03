import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/core/decorators/auth.decorator'
import { PushNotificationDto } from 'src/notifications/dto/push-notification.dto'
import { NotificationsService } from 'src/notifications/notifications.service'

@ApiTags('notifications')
@Controller('notifications')
@Auth()
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('web')
  @ApiOperation({ summary: 'Push web notification' })
  webPush(@Body() notification: PushNotificationDto) {
    return this.notificationsService.webPush(notification)
  }

  @Post('mail')
  @ApiOperation({ summary: 'Send mail' })
  sendMail(@Body() notification: PushNotificationDto) {
    return this.notificationsService.sendMail(notification)
  }
}
