import { Module } from '@nestjs/common'
import { SubsController } from 'src/subs/subs.controller'
import { SubsService } from 'src/subs/subs.service'

@Module({
  providers: [SubsService],
  controllers: [SubsController],
  exports: [SubsService],
})
export class SubsModule {}
