import { Event } from '../types/Event'
import { format } from 'date-fns'
import { TIMESTAMP_FORMAT } from '../constants'

export function eventToLines(event: Event): string[] {
  const lines: string[] = []
  lines.push('BEGIN:VEVENT')
  lines.push(`UID:"${event.uid}"`)
  if (event.dataTimestamp !== undefined) {
    lines.push(`DTSTAMP:${format(event.dataTimestamp, TIMESTAMP_FORMAT)}`)
  }
  lines.push(`DTSTART:${format(event.startTime, TIMESTAMP_FORMAT)}`)
  lines.push(`DTEND:${format(event.endTime, TIMESTAMP_FORMAT)}`)
  if (event.location !== undefined) {
    lines.push(`LOCATION:"${event.location}"`)
  }
  if (event.description !== undefined) {
    lines.push(`DESCRIPTION:"${event.description}"`)
  }
  lines.push(`SUMMARY:"${event.summary}"`)
  lines.push('END:VEVENT')
  return lines
}
