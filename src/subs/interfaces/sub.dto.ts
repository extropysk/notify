import { Base } from 'src/db/interfaces/base.interface'

export interface Sub extends Base {
  email: string
  web?: {
    endpoint: string
    keys: { p256dh: string; auth: string }
  }
  userId: string
}
