const getActivePages = ({ pages, pageId }) =>
  Object.entries(pages).reduce((acc, page) => {
    const [name, { id }] = page
    const firstLetter = name[0].toUpperCase()
    const remainingLetters = name.substr(1)
    const key = `is${firstLetter}${remainingLetters}`
    acc[key] = id === pageId

    return acc
  }, {})

export default getActivePages
