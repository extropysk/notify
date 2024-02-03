import { Base } from 'src/db/interfaces/base.interface'

export interface Template extends Base {
  content: string,
  userId: string
}
