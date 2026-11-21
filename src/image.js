export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const IMAGE_TYPES_LABEL = 'JPEG, PNG, WebP or GIF';

const MAX_PIXELS = 16000000;

export const exportSize = (naturalWidth, naturalHeight) => {
  const shrink = Math.min(1, Math.sqrt(MAX_PIXELS / (naturalWidth * naturalHeight)));
  return {
    width: Math.round(naturalWidth * shrink) || 0,
    height: Math.round(naturalHeight * shrink) || 0
  };
};

export const memedName = fileName => `memed-${fileName.replace(/\.[^.]*$/, '')}.png`;
