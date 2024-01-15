import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/core/decorators/auth.decorator'
import { Current } from 'src/core/decorators/current.decorator'
import { Payload } from 'src/core/interfaces/payload.interface'
import { PushNotificationDto } from 'src/notifications/dto/push-notification.dto'
import { NotificationsService } from 'src/notifications/notifications.service'

@ApiTags('notifications')
@Controller('notifications')
@Auth()
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('web')
  @ApiOperation({ summary: 'Push web notification' })
  webPush(@Body() notification: PushNotificationDto, @Current() current: Payload) {
    return this.notificationsService.webPush(notification, current)
  }
}
