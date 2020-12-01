import removeMd from 'remove-markdown'

export function removeMarkdown(markdown: string) {
  const plainText = removeMd(markdown)

  return plainText
}
