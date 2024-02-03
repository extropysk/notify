import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/core/decorators/auth.decorator'
import { Current } from 'src/core/decorators/current.decorator'
import { Permission } from 'src/core/enums/permission.enum'
import { Payload } from 'src/core/interfaces/payload.interface'
import { BaseDto } from 'src/db/dto/base.dto'
import { DeleteResultDto } from 'src/db/dto/delete-result.dto'
import { IdDto } from 'src/db/dto/id.dto'
import { CreateTemplateDto } from 'src/templates/dto/create-template.dto'
import { TemplateDto } from 'src/templates/dto/template.dto'
import { TemplatesService } from 'src/templates/templates.service'

const MODULE = 'notify'

@ApiTags('templates')
@Controller('templates')
export class TemplatesController {
  constructor(private templateService: TemplatesService) {}

  @Post()
  @ApiOperation({ summary: 'Insert template' })
  @ApiOkResponse({ type: BaseDto })
  @Auth(MODULE, Permission.CREATE)
  async insert(@Body() templateDto: CreateTemplateDto, @Current() current: Payload) {
    return await this.templateService.insert(templateDto, current)
  }

  @ApiOperation({ summary: 'Get template' })
  @ApiOkResponse({ type: TemplateDto })
  @Get(':id')
  @Auth(MODULE, Permission.READ)
  async findOne(@Param() { id }: IdDto) {
    const template = await this.templateService.findOne({ _id: id })
    if (!template) {
      throw new NotFoundException()
    }
    return template
  }

  @ApiOperation({ summary: 'Delete template' })
  @ApiOkResponse({ type: DeleteResultDto })
  @Delete(':id')
  @Auth(MODULE, Permission.DELETE)
  async delete(@Param() { id }: IdDto) {
    return await this.templateService.deleteOne(id)
  }
}
