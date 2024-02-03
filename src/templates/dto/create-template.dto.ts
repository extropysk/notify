import { IsString } from "class-validator";


export class CreateTemplateDto {
  @IsString()
  content: string
}
