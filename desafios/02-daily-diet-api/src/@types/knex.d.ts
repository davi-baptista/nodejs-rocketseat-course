// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      id: string
      name: string
      description: string
      in_or_out_diet: 'in_diet' | 'out_diet'
      created_at: string
      session_id: string
    }
  }
}
