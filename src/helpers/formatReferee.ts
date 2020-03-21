export function formatReferee(
  referee: null | undefined | { name?: null | string; phone: string[] },
) {
  if (!referee) {
    return ''
  }
  return `${referee.name ?? 'Okänt namn'}${
    referee.phone.length > 0 ? ` (${referee.phone.join(', ')})` : ''
  }`
}
