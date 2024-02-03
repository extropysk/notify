import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DatabaseModule } from 'src/db/database.module'
import { NotificationsController } from 'src/notifications/notifications.controller'
import { NotificationsService } from 'src/notifications/notifications.service'
import { SubsModule } from 'src/subs/subs.module'

@Module({
  providers: [NotificationsService],
  controllers: [NotificationsController],
  imports: [
    DatabaseModule,
    SubsModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: config.get<string>('SMTP'),
        defaults: {
          from: '"noreply" noreply@extropy.sk',
        }
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
