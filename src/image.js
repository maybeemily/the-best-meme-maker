// Formats every browser can display and draw to a canvas for saving.
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const IMAGE_TYPES_LABEL = 'JPEG, PNG, WebP or GIF';

// Browsers refuse to draw canvases much larger than ~16 million pixels.
const MAX_PIXELS = 16000000;

// The pixel size to save a meme at: the original image's size, shrunk
// proportionally only if it is too big to export. Zeros if the size is unknown.
export const exportSize = (naturalWidth, naturalHeight) => {
  const shrink = Math.min(1, Math.sqrt(MAX_PIXELS / (naturalWidth * naturalHeight)));
  return {
    width: Math.round(naturalWidth * shrink) || 0,
    height: Math.round(naturalHeight * shrink) || 0
  };
};

// "cat.photo.jpg" -> "memed-cat.photo.png" (the export is always a PNG)
export const memedName = fileName => `memed-${fileName.replace(/\.[^.]*$/, '')}.png`;
