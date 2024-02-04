import { MailerService } from '@nestjs-modules/mailer'
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import Handlebars from 'handlebars'
import { Db } from 'mongodb'
import { DATABASE } from 'src/db/database.module'
import { MailNotificationDto } from 'src/notifications/dto/mail-notification.dto'
import { SubsService } from 'src/subs/subs.service'
import { TemplatesService } from 'src/templates/templates.service'

@Injectable()
export class NotificationsService {

  constructor(
    @Inject(DATABASE)
    private db: Db,
    private readonly mailerService: MailerService,
    private subsService: SubsService,
    private templatesService: TemplatesService
  ) {
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
