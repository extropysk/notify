import { BaseDto } from 'src/db/dto/base.dto'
import { Template } from 'src/templates/interfaces/template.dto'

export class TemplateDto extends BaseDto implements Template {
  content: string
  userId: string
}
