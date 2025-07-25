/**
 * Helper function to get asset paths with basePath for GitHub Pages
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/jolly-games' : '';
  return `${basePath}${path}`;
}

/**
 * Helper function specifically for images
 */
export function getImagePath(imagePath: string): string {
  return getAssetPath(`/images/${imagePath}`);
}

/**
 * Helper function specifically for fonts
 */
export function getFontPath(fontPath: string): string {
  return getAssetPath(`/fonts/${fontPath}`);
}

/**
 * Helper function for emojis
 */
export function getEmojiPath(emojiPath: string): string {
  return getAssetPath(`/emojils/${emojiPath}`);
}