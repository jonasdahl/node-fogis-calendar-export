import express from 'express'
import { iCalendar } from '../iCalendar'
import gql from 'graphql-tag'
import { GamesQuery } from './__types__/GamesQuery'
import { print } from 'graphql/language/printer'
import { gameToICalEvent } from '../helpers/gameToICalEvent'
import { GraphQLClient } from 'graphql-request'
import { authorization } from '../middleware/authorization'
import bodyParser from 'body-parser'
import { encrypt } from '../helpers/encryption'
import { base64Encode } from '../helpers/hash'

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT ?? 'http://localhost:4000'

export function games() {
  const router = express.Router()

  console.log(
    'Configured to access GraphQL Fogis endpoint with GRAPHQL_ENDPOINT=',
    GRAPHQL_ENDPOINT,
  )

  router.get('/games', authorization, async (req, res) => {
    const { username, password } = req.principal!

    const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
      headers: {
        authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      },
    })

    const { games } = await client.request<GamesQuery>(print(GAMES_QUERY))

    const events = games.map(game => gameToICalEvent(game))

    const calendar = iCalendar({
      productId: '-//Matcher i Fogis//Jonas Dahl//SV',
      name: 'Matcher i Fogis',
    })

    calendar.addEvents(events)

    res.setHeader('Content-disposition', 'attachment; filename=calendar.ics')
    res.send(calendar.toString())
  })

  return router
}

const GAMES_QUERY = gql`
  query GamesQuery {
    games {
      id
      time
      homeTeam {
        name
      }
      awayTeam {
        name
      }
      location {
        name
      }
      referees {
        referee {
          name
          phone
        }
        assistantReferee1 {
          name
          phone
        }
        assistantReferee2 {
          name
          phone
        }
        fourthOfficial {
          name
          phone
        }
      }
    }
  }
`
