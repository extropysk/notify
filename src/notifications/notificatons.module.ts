import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/db/database.module'
import { NotificationsController } from 'src/notifications/notifications.controller'
import { NotificationsService } from 'src/notifications/notifications.service'
import { SubsModule } from 'src/subs/subs.module'

@Module({
  providers: [NotificationsService],
  controllers: [NotificationsController],
  imports: [DatabaseModule, SubsModule],
  exports: [NotificationsService],
})
export class NotificationsModule {}
