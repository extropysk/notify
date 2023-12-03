import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/db/database.module'
import { SubsController } from 'src/subs/subs.controller'
import { SubsService } from 'src/subs/subs.service'

@Module({
  providers: [SubsService],
  controllers: [SubsController],
  imports: [DatabaseModule],
  exports: [SubsService],
})
export class SubsModule {}
