const pad = (string: string | number) => {
  return ("0" + string).slice(-2)
}

export const format = (seconds: number) => {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

export const dateDiff = {
  inHours: (d1: Date, d2: Date) => {
    const t2 = d2.getTime()
    const t1 = d1.getTime()

    const difference = Math.round(parseFloat((t1 - t2) / (3600 * 1000)))

    return {
      text: `${difference} ${difference === 1 ? "hour" : "hours"} ago`,
      diff: difference,
    }
  },
  inDays: (d1: Date, d2: Date) => {
    const t2 = d2.getTime()
    const t1 = d1.getTime()

    const difference = Math.round(parseFloat((t1 - t2) / (3600 * 1000 * 24)))

    return {
      text: `${difference} ${difference === 1 ? "day" : "days"} ago`,
      diff: difference,
    }
  },
}

export const formatNumber = (num: number) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
