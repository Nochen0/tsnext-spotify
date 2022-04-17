export const randomColor = () => {
  const colors = [
    "blackAlpha",
    "red",
    "green",
    "blue",
    "yellow",
    "gray",
    "pink",
    "purple",
    "orange",
    "teal",
    "cyan",
  ]
  const random = Math.floor(Math.random() * colors.length)
  return colors[random] + `.${randomColorOpt()}`
}

const randomColorOpt = () => {
  const opts = ["300", "400", "500", "600", "700", "800", "900"]
  const random = Math.floor(Math.random() * opts.length)
  return opts[random]
}

export const getColor = async (id: string) => {
  const color = await fetch(
    `https://spotify-clone-68d68-default-rtdb.firebaseio.com/${id}.json`
  ).then(res => res.json())

  if (color) {
    const _color = Object.values(color) as any
    return {
      props: {
        color: _color[0],
      },
    }
  } else {
    await fetch(
      `https://spotify-clone-68d68-default-rtdb.firebaseio.com/${id}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          color: randomColor(),
        }),
      }
    )
    const color = await fetch(
      `https://spotify-clone-68d68-default-rtdb.firebaseio.com/${id}.json`
    ).then(res => res.json())
    const _color = Object.values(color) as any
    return {
      props: {
        color: _color[0],
      },
    }
  }
}
