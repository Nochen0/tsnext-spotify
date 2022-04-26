import { useCallback, useEffect, useState } from "react";

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
  ];
  const random = Math.floor(Math.random() * colors.length);
  return colors[random] + `.${randomColorOpt()}`;
};

const randomColorOpt = () => {
  const opts = ["300", "400", "500", "600", "700", "800", "900"];
  const random = Math.floor(Math.random() * opts.length);
  return opts[random];
};

export const getColor = async (id: string | string[] | undefined) => {
  const color = await fetch(
    `https://spotify-clone-68d68-default-rtdb.firebaseio.com/${id}.json`
  ).then((res) => res.json());

  if (color) {
    const _color = Object.values(color) as any;
    return {
      props: {
        color: _color[0],
      },
    };
  } else {
    await fetch(`https://spotify-clone-68d68-default-rtdb.firebaseio.com/${id}.json`, {
      method: "POST",
      body: JSON.stringify({
        color: randomColor(),
      }),
    });
    const color = await fetch(
      `https://spotify-clone-68d68-default-rtdb.firebaseio.com/${id}.json`
    ).then((res) => res.json());
    const _color = Object.values(color) as any;
    return {
      props: {
        color: _color[0],
      },
    };
  }
};

export const msToTime = (ms: number) => {
  let seconds = Math.floor((ms / 1000).toFixed(1));
  let minutes = Math.floor((ms / (1000 * 60)).toFixed(1));
  let hours = Math.floor((ms / (1000 * 60 * 60)).toFixed(1));

  if (hours >= 1) {
    return `${hours} hr ${minutes - hours * 60} min`;
  } else {
    return `${minutes} min ${seconds - minutes * 60} sec`;
  }
};

const pad = (string: string | number) => {
  return ("0" + string).slice(-2);
};

export const format = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

export const dateDiff = {
  inHours: (d1: Date, d2: Date) => {
    const t2 = d2.getTime();
    const t1 = d1.getTime();

    const difference = Math.round(parseFloat((t1 - t2) / (3600 * 1000)));

    return `${difference} ${difference === 1 ? "hour" : "hours"} ago`;
  },
  inDays: (d1: Date, d2: Date) => {
    const t2 = d2.getTime();
    const t1 = d1.getTime();

    const difference = Math.round(parseFloat((t1 - t2) / (3600 * 1000 * 24)));

    if (difference < 1) {
      return dateDiff.inHours(d1, d2);
    }

    return `${difference} ${difference === 1 ? "day" : "days"} ago`;
  },
};

export const formatNumber = (num: number) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const dynamicSlice = (windowWidth: number, sliceWidth: number) => {
  return Math.floor((windowWidth - 260) / sliceWidth);
};

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return [windowWidth];
};
