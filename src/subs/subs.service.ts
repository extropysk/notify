import { Inject, Injectable } from '@nestjs/common'
import { Db, Filter } from 'mongodb'
import { Payload } from 'src/core/interfaces/payload.interface'
import { DATABASE } from 'src/db/database.module'
import { CreateSubDto } from 'src/subs/dto/create-sub.dto'
import { Sub } from 'src/subs/interfaces/sub.dto'

const COLLECTION = 'subs'

@Injectable()
export class SubsService {
  constructor(
    @Inject(DATABASE)
    private db: Db
  ) {}

  async findOne(filter: Filter<Sub>) {
    return await this.db.collection<Sub>(COLLECTION).findOne(filter)
  }

  async subscribe(sub: CreateSubDto, current: Payload) {
    const doc = {
      ...sub,
      userId: current.sub,
    }

    return await this.db
      .collection<Sub>(COLLECTION)
      .updateOne({ userId: current.sub }, { $set: doc }, { upsert: true })

    console.log(sub)
    // return await webPush.sendNotification(
    //   sub,
    //   JSON.stringify({
    //     title: 'subscribe',
    //     description: 'this message is coming from the server',
    //   }),
    //   this.options
    // )
  }
}
