export const formatDate = (date: string) => {
  const dateObj = new Date(date)
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  })
  const formattedDate = formatter.format(dateObj)

  return formattedDate
}
