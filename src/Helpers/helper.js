export const dateDifference = (first = '', second = '', locale = '') => {
  // Define the past date
  const firstDate = first ? new Date(first) : new Date()

  // Get the current date
  const secondDate = second ? new Date(second) : new Date()

  // Calculate the difference in milliseconds
  const diffInMs = secondDate.getTime() - firstDate.getTime()

  if (diffInMs < 0) return ''

  // Convert the difference to different time units
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  // Format using Intl.RelativeTimeFormat
  const formatter = new Intl.RelativeTimeFormat(locale || 'en', {
    numeric: 'auto'
  })

  let timeAgo
  if (diffInYears > 0) {
    timeAgo = formatter.format(-diffInYears, 'year')
  } else if (diffInMonths > 0) {
    timeAgo = formatter.format(-diffInMonths, 'month')
  } else if (diffInDays > 0) {
    timeAgo = formatter.format(-diffInDays, 'day')
  } else if (diffInHours > 0) {
    timeAgo = formatter.format(-diffInHours, 'hour')
  } else if (diffInMinutes > 0) {
    timeAgo = formatter.format(-diffInMinutes, 'minute')
  } else {
    timeAgo = formatter.format(-diffInSeconds, 'second')
  }
  // if (diffInYears > 0) {
  //   return (-diffInYears)
  // }

  return timeAgo // Output: e.g., "7 days ago"
}
