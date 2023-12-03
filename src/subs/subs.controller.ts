import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/core/decorators/auth.decorator'
import { Current } from 'src/core/decorators/current.decorator'
import { Payload } from 'src/core/interfaces/payload.interface'
import { UpdateResultDto } from 'src/db/dto/update-result.dto'
import { CreateSubDto } from 'src/subs/dto/create-sub.dto'
import { SubsService } from 'src/subs/subs.service'

@ApiTags('subs')
@Controller('subs')
@Auth()
export class SubsController {
  constructor(private subsService: SubsService) {}

  @Post()
  @ApiOperation({ summary: 'Subscribe' })
  @ApiOkResponse({ type: UpdateResultDto })
  subscribe(@Body() subDto: CreateSubDto, @Current() current: Payload) {
    return this.subsService.subscribe(subDto, current)
  }
}
