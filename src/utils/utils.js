function removeHtmlTags(str) {
  return str.replace(/<[^>]*>?/gm, '');
}

const utils = {
    removeHtmlTags,
}

export default utils