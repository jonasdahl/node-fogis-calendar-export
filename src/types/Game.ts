import { Team } from './Team'
import { Location } from './Location'
import { RefereeAssignment } from './RefereeAssignment'

export interface Game {
  id: string
  time: string
  homeTeam: Team
  awayTeam: Team
  location: Location
  referees: RefereeAssignment
}
