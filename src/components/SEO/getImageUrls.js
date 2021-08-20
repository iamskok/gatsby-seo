const getImageUrls = ({ images, siteUrl }) =>
  Object.entries(images).reduce((acc, image) => {
    const [
      key,
      {
        images: {
          fallback: { src: path },
        },
      },
    ] = image
    const url = `${siteUrl}${path}`
    acc[`${key}ImageUrl`] = url

    return acc
  }, {})

export default getImageUrls
