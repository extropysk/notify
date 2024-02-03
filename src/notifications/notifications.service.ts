import { MailerService } from '@nestjs-modules/mailer'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Db } from 'mongodb'
import { DATABASE } from 'src/db/database.module'
import { PushNotificationDto } from 'src/notifications/dto/push-notification.dto'
import { SubsService } from 'src/subs/subs.service'
import webPush from 'web-push'

@Injectable()
export class NotificationsService {
  options

  constructor(
    @Inject(DATABASE)
    private db: Db,
    private configService: ConfigService,
    private readonly mailerService: MailerService,
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

  async webPush(notification: PushNotificationDto) {
    const sub = await this.subsService.findOne({ userId: notification.recipientId })
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

    return {}
  }

  async sendMail(notification: PushNotificationDto) {
    const sub = await this.subsService.findOne({ userId: notification.recipientId })
    if(!sub) {
      throw new NotFoundException()
    }

    await this.mailerService
      .sendMail({
        to: sub.email,
        // from: 'noreply@nestjs.com',
        subject: notification.subject,
        html: notification.body
      })
    
    return {}
  }
}
