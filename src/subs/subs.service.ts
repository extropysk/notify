import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateSubDto } from 'src/subs/dto/sub.dto'
import webPush from 'web-push'

@Injectable()
export class SubsService {
  options

  constructor(private configService: ConfigService) {
    this.options = {
      vapidDetails: {
        subject: configService.get<string>('VAPID_SUBJECT'),
        publicKey: configService.get<string>('VAPID_PUBLIC'),
        privateKey: configService.get<string>('VAPID_PRIVATE'),
      },
      TTL: 60,
    }
  }

  async subscribe(sub: CreateSubDto) {
    return await webPush.sendNotification(
      sub,
      JSON.stringify({
        title: 'subscribe',
        description: 'this message is coming from the server',
      }),
      this.options
    )
  }
}
