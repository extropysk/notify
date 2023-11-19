import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/core/decorators/auth.decorator'
import { CreateSubDto } from 'src/subs/dto/sub.dto'
import { SubsService } from 'src/subs/subs.service'

@ApiTags('subs')
@Controller('subs')
@Auth()
export class SubsController {
  constructor(private subsService: SubsService) {}

  @Post()
  @ApiOperation({ summary: 'Subscribe' })
  subscribe(@Body() subDto: CreateSubDto) {
    return this.subsService.subscribe(subDto)
  }
}
