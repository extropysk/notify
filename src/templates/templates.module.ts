import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/db/database.module'
import { TemplatesController } from 'src/templates/templates.controller'
import { TemplatesService } from 'src/templates/templates.service'

@Module({
  providers: [TemplatesService],
  controllers: [TemplatesController],
  imports: [DatabaseModule],
  exports: [TemplatesService],
})
export class TemplatesModule {}
