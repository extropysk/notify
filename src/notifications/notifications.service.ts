import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Db } from 'mongodb'
import { Payload } from 'src/core/interfaces/payload.interface'
import { DATABASE } from 'src/db/database.module'
import { PushNotificationDto } from 'src/notifications/dto/push-notification.dto'
import { NotificationType } from 'src/notifications/enums/notification-type.enum'
import { SubsService } from 'src/subs/subs.service'
import webPush from 'web-push'

@Injectable()
export class NotificationsService {
  options

  constructor(
    @Inject(DATABASE)
    private db: Db,
    private configService: ConfigService,
    private subsService: SubsService
  ) {
    this.options = {
      vapidDetails: {
        subject: configService.get<string>('VAPID_SUBJECT'),
        publicKey: configService.get<string>('VAPID_PUBLIC'),
        privateKey: configService.get<string>('VAPID_PRIVATE'),
      },
      TTL: 60,
    }
  }

  async push(notification: PushNotificationDto, current: Payload) {
    const sub = await this.subsService.findOne({ userId: notification.recipientId })

    switch (notification.type) {
      case NotificationType.WEB:
      default:
        if (!sub?.web) {
          throw new NotFoundException()
        }
        await webPush.sendNotification(
          sub.web,
          JSON.stringify({
            title: notification.subject,
            description: notification.body,
          }),
          this.options
        )
        break
    }

    // TODO: insert do db
    return {}
  }
}
