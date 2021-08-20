const isHttpUrl = str => {
  try {
    return new URL(str) && Boolean(str.match(/http(s?):\/\//))
  } catch (_error) {
    return false
  }
}

const isFilePathName = str => str?.split(`.`).filter(Boolean).length > 1

const slashify = (...items) => {
  const length = items.length

  if (length === 1) {
    const item = items[0]
    if (item === `/`) {
      return `/`
    }

    if (isHttpUrl(item)) {
      return item
    }

    if (isFilePathName(item)) {
      return `/${item}`
    }

    return `/${item}/`
  } else {
    return items.reduce((acc, item, index) => {
      if (isHttpUrl(item)) {
        if (index !== 0) {
          throw Error(`HTTP URL has to be passed as the first argument`)
        } else {
          return item + `/`
        }
      }

      if (isFilePathName(item)) {
        if (index !== length - 1) {
          throw Error(`File pathname has to be passed as the last argument`)
        } else {
          return acc + item
        }
      }

      if (index === 0) {
        return `/${item}/`
      } else {
        return acc + item + `/`
      }
    }, ``)
  }
}

module.exports = slashify
