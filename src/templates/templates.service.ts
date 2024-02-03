import { Inject, Injectable } from '@nestjs/common'
import { Db, Filter, ObjectId } from 'mongodb'
import { Payload } from 'src/core/interfaces/payload.interface'
import { DATABASE } from 'src/db/database.module'
import { WithoutId } from 'src/db/dto/base.dto'
import { CreateTemplateDto } from 'src/templates/dto/create-template.dto'
import { Template } from 'src/templates/interfaces/template.dto'

const COLLECTION = 'templates'

@Injectable()
export class TemplatesService {
  constructor(
    @Inject(DATABASE)
    private db: Db
  ) {}

  async findOne(filter: Filter<Template>) {
    return await this.db.collection<Template>(COLLECTION).findOne(filter)
  }
  
  async deleteOne(id: ObjectId) {
    return await this.db.collection<Template>(COLLECTION).deleteOne({ _id: id })
  }

  async insert(templateDto: CreateTemplateDto, current: Payload) {
    const template = {
      ...templateDto,
      userId: current.sub
    }

    const { insertedId } = await this.db.collection<WithoutId<Template>>(COLLECTION).insertOne(template)
    return { _id: insertedId }
  }
}
