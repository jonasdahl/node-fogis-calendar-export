import { Event } from '../iCalendar/types/Event'
import { parse, addHours } from 'date-fns'
import { formatReferee } from './formatReferee'
import { Game } from '../types/Game'
import { GRAPHQL_DATE_FORMAT } from '../constants'

export function gameToICalEvent(game: Game): Event {
  return {
    url: `https://fogis.svenskfotboll.se/Fogisdomarklient/Match/MatchUppgifter.aspx?matchId=${game.id}`,
    uid: game.id,
    dataTimestamp: new Date(),
    startTime: parse(game.time, GRAPHQL_DATE_FORMAT, Date.now()),
    endTime: addHours(parse(game.time, GRAPHQL_DATE_FORMAT, Date.now()), 2),
    summary: `${game.homeTeam?.name}-${game.awayTeam?.name}`,
    location: `${game.location?.name}`,
    description: [
      'Domare:',
      `HD: ${formatReferee(game.referees.referee)}`,
      game.referees.assistantReferee1?.name &&
        `AD1: ${formatReferee(game.referees.assistantReferee1)}`,
      game.referees.assistantReferee2?.name &&
        `AD2: ${formatReferee(game.referees.assistantReferee2)}`,
      game.referees.fourthOfficial?.name
        ? `4:e dom: ${formatReferee(game.referees.fourthOfficial)}`
        : null,
    ]
      .filter(x => x)
      .join('\\n'),
  }
}
