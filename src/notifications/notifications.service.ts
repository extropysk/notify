import { MailerService } from '@nestjs-modules/mailer'
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Handlebars from 'handlebars'
import { Db } from 'mongodb'
import { DATABASE } from 'src/db/database.module'
import { MailNotificationDto } from 'src/notifications/dto/mail-notification.dto'
import { WebNotificationDto } from 'src/notifications/dto/web-notification.dto'
import { SubsService } from 'src/subs/subs.service'
import { TemplatesService } from 'src/templates/templates.service'
import webPush from 'web-push'

@Injectable()
export class NotificationsService {
  options

  constructor(
    @Inject(DATABASE)
    private db: Db,
    private configService: ConfigService,
    private readonly mailerService: MailerService,
    private subsService: SubsService,
    private templatesService: TemplatesService
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

  async notifyWeb(notification: WebNotificationDto) {
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

  async notifyMail(notification: MailNotificationDto) {
    const sub = await this.subsService.findOne({ userId: notification.recipientId })
    if(!sub) {
      throw new NotFoundException()
    }

    const template = await this.templatesService.findOne({ _id: notification.templateId })
    if(!template) {
      throw new BadRequestException()
    }

    const t = Handlebars.compile(template.content)
    await this.mailerService
      .sendMail({
        to: sub.email,
        // from: 'noreply@nestjs.com',
        subject: notification.subject,
        html: t(notification.content)
      })
    
    return {}
  }
}
