// Browsers refuse to draw canvases much larger than ~16 million pixels.
const MAX_PIXELS = 16000000;

// The pixel size to save the meme at: the original image's size, shrunk
// proportionally only if it is too big to export. Null when sizes are unknown.
export default function exportSize(naturalWidth, naturalHeight) {
  if(!naturalWidth || !naturalHeight) return null;
  const pixels = naturalWidth * naturalHeight;
  const shrink = pixels > MAX_PIXELS ? Math.sqrt(MAX_PIXELS / pixels) : 1;
  return {
    width: Math.round(naturalWidth * shrink),
    height: Math.round(naturalHeight * shrink)
  };
}
