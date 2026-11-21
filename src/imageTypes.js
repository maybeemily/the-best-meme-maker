// Formats every browser can display and draw to a canvas for saving.
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const IMAGE_TYPES_LABEL = 'JPEG, PNG, WebP or GIF';

export const isSupportedImage = file => IMAGE_TYPES.includes(file.type);
