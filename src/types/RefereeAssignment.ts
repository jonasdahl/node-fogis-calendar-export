import { Referee } from './Referee'

export interface RefereeAssignment {
  referee: null | Referee
  assistantReferee1: null | Referee
  assistantReferee2: null | Referee
  fourthOfficial: null | Referee
}
