import { Event } from './types/Event'
import { CRLF } from './constants'
import { splitLongLines } from './helpers/splitLongLines'
import { eventToLines } from './helpers/eventToLines'

export function iCalendar({ productId, name }: { name: string; productId: string }) {
  const events: Event[] = []
  let url: string | undefined = undefined
  let description: string | undefined = undefined

  return {
    addEvents(newEvents: Event[]) {
      events.push(...newEvents)
    },
    toString() {
      const lines: string[] = []
      lines.push('BEGIN:VCALENDAR')
      lines.push('VERSION:2.0')
      if (url) {
        lines.push(`URL:${url}`)
      }
      lines.push(`PRODID:${productId}`)
      lines.push(`NAME:${name}`)
      lines.push(`X-WR-CALNAME:${name}`)
      if (description) {
        lines.push(`DESCRIPTION:${description}`)
        lines.push(`X-WR-CALDESC:${description}`)
      }

      events.forEach(event => {
        lines.push(...eventToLines(event))
      })

      lines.push('END:VCALENDAR')

      return splitLongLines(lines).join(CRLF)
    },
  }
}
