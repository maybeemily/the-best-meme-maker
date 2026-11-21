import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import domtoimage from 'dom-to-image';
import Meme from './Meme';

vi.mock('dom-to-image', () => ({
  default: { toPng: vi.fn() }
}));

const field = (container, name) => container.querySelector(`[name="${name}"]`);
const change = (el, value) => fireEvent.change(el, { target: { value } });
const spanStyle = text => getComputedStyle(screen.getByText(text));
const makeFile = (name = 'cat.png', type = 'image/png') => new File(['pixels'], name, { type });

const previewSrc = container => container.querySelector('img')?.getAttribute('src');

const uploadImage = async(container, file = makeFile()) => {
  fireEvent.change(field(container, 'image'), { target: { files: [file] } });
  await waitFor(() => expect(previewSrc(container)).toMatch(/^data:/));
};

const dropFile = (target, file) => fireEvent.drop(target, { dataTransfer: { files: [file] } });

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('Meme: empty state', () => {
  it('shows the upload box with an upload button and a disabled Save', () => {
    const { container } = render(<Meme />);
    expect(screen.getByText('Upload image')).toBeTruthy();
    expect(screen.getByLabelText(/upload image/i)).toBe(field(container, 'image'));
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByText('Save Meme to Computer').disabled).toBe(true);
  });

  it('connects every form label to its control', () => {
    render(<Meme />);
    ['Top text:', 'Bottom text:', 'Text color:', 'Font:', 'Text Size:'].forEach(label => {
      expect(screen.getByLabelText(label)).toBeTruthy();
    });
  });
});

describe('Meme: text color', () => {
  it('starts as the site pink, on the picker and on the meme text', async() => {
    const { container } = render(<Meme />);
    expect(field(container, 'textColor').value).toBe('#ff00a1');
    await uploadImage(container);
    change(field(container, 'topText'), 'PINK');
    expect(spanStyle('PINK').color).toBe('rgb(255, 0, 161)');
  });
});

describe('Meme: dropdowns', () => {
  it.each(['font', 'fontSize'])('every option in the %s dropdown has its own value', name => {
    const { container } = render(<Meme />);
    const values = [...field(container, name).options].map(option => option.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it('shows "medium" as the default text size and lets you pick any size, including medium again', () => {
    const { container } = render(<Meme />);
    const select = field(container, 'fontSize');
    const shown = () => select.selectedOptions[0].textContent;
    expect(shown()).toBe('medium');
    for(const [value, label] of [['1em', 'small'], ['3em', 'medium'], ['6em', 'big'], ['9em', 'too big'], ['3em', 'medium']]) {
      change(select, value);
      expect(shown()).toBe(label);
    }
  });
});

describe('Meme: uploading', () => {
  it('replaces the box with the meme preview when an image is chosen', async() => {
    const { container } = render(<Meme />);
    await uploadImage(container);
    expect(screen.queryByText('Upload image')).toBeNull();
    expect(previewSrc(container)).toMatch(/^data:image\/png;base64,/);
    expect(screen.getByText('Save Meme to Computer').disabled).toBe(false);
    expect(screen.getByText('Change image')).toBeTruthy();
  });

  it('accepts an image dropped on the box', async() => {
    const { container } = render(<Meme />);
    dropFile(screen.getByText('Upload image').closest('label'), makeFile('dropped.gif', 'image/gif'));
    await waitFor(() => expect(previewSrc(container)).toMatch(/^data:image\/gif;base64,/));
  });

  it('accepts JPEG, PNG, WebP and GIF files', async() => {
    for(const [name, type] of [['a.jpg', 'image/jpeg'], ['b.png', 'image/png'], ['c.webp', 'image/webp'], ['d.gif', 'image/gif']]) {
      cleanup();
      const { container } = render(<Meme />);
      dropFile(screen.getByText('Upload image').closest('label'), makeFile(name, type));
      await waitFor(() => expect(previewSrc(container)).toMatch(new RegExp(`^data:${type}`)));
      expect(screen.queryByRole('alert')).toBeNull();
    }
  });

  it.each([
    ['notes.txt', 'text/plain'],
    ['doc.pdf', 'application/pdf'],
    ['logo.svg', 'image/svg+xml'],
    ['photo.heic', 'image/heic'],
    ['mystery', '']
  ])('shows an error and keeps the box when %s is dropped', async(name, type) => {
    const { container } = render(<Meme />);
    dropFile(screen.getByText('Upload image').closest('label'), makeFile(name, type));
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain(name);
    expect(alert.textContent).toContain('JPEG, PNG, WebP or GIF');
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByText('Upload image')).toBeTruthy();
  });

  it('shows the same error when a bad file is chosen with the file picker', async() => {
    const { container } = render(<Meme />);
    fireEvent.change(field(container, 'image'), { target: { files: [makeFile('notes.txt', 'text/plain')] } });
    expect((await screen.findByRole('alert')).textContent).toContain('notes.txt');
  });

  it('only offers supported image types in the file picker', () => {
    const { container } = render(<Meme />);
    expect(field(container, 'image').getAttribute('accept')).toBe('image/jpeg,image/png,image/webp,image/gif');
  });

  it('keeps the current image and shows an error when a bad file replaces it, then clears the error on a good upload', async() => {
    const { container } = render(<Meme />);
    await uploadImage(container, makeFile('good.png'));
    const before = previewSrc(container);
    dropFile(container.querySelector('img').closest('div').parentElement, makeFile('bad.pdf', 'application/pdf'));
    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(previewSrc(container)).toBe(before);

    await uploadImage(container, makeFile('better.jpg', 'image/jpeg'));
    await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
  });

  it('clears the error on Start Over', async() => {
    const { container } = render(<Meme />);
    dropFile(screen.getByText('Upload image').closest('label'), makeFile('notes.txt', 'text/plain'));
    await screen.findByRole('alert');
    fireEvent.click(screen.getByText('Start Over'));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
  });
});

describe('Meme: editing', () => {
  it('shows typed top and bottom text on the meme', async() => {
    const { container } = render(<Meme />);
    await uploadImage(container);
    change(field(container, 'topText'), 'HELLO');
    change(field(container, 'bottomText'), 'WORLD');
    expect(screen.getByText('HELLO')).toBeTruthy();
    expect(screen.getByText('WORLD')).toBeTruthy();
  });

  it('applies color, font and size changes to the meme text', async() => {
    const { container } = render(<Meme />);
    await uploadImage(container);
    change(field(container, 'topText'), 'STYLE ME');
    change(field(container, 'textColor'), '#ff0000');
    change(field(container, 'font'), 'Martel');
    change(field(container, 'fontSize'), '6em');
    const style = spanStyle('STYLE ME');
    expect(style.color).toBe('rgb(255, 0, 0)');
    expect(style.fontFamily).toContain('Martel');
    expect(style.fontSize).toBe('6em');
  });

  it('clears everything, brings back the box and restores defaults on Start Over', async() => {
    const { container } = render(<Meme />);
    await uploadImage(container);
    change(field(container, 'topText'), 'GONE');
    change(field(container, 'bottomText'), 'SOON');
    change(field(container, 'textColor'), '#ff0000');
    change(field(container, 'fontSize'), '9em');
    change(field(container, 'font'), 'Impact');

    fireEvent.click(screen.getByText('Start Over'));

    expect(field(container, 'topText').value).toBe('');
    expect(field(container, 'bottomText').value).toBe('');
    expect(screen.queryByText('GONE')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByText('Upload image')).toBeTruthy();
    expect(field(container, 'textColor').value).toBe('#ff00a1');
    expect(field(container, 'fontSize').value).toBe('3em');
    expect(field(container, 'font').value).toBe('sans-serif');
  });
});

describe('Meme: saving', () => {
  const saveAndGetLink = async() => {
    domtoimage.toPng.mockResolvedValue('data:image/png;base64,AAAA');
    const links = [];
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function() {
      links.push({ download: this.download, href: this.href });
    });
    fireEvent.click(screen.getByText('Save Meme to Computer'));
    await waitFor(() => expect(click).toHaveBeenCalledTimes(1));
    click.mockRestore();
    return links[0];
  };

  it('downloads memed-<name>.png, swapping the original extension for png', async() => {
    const { container } = render(<Meme />);
    await uploadImage(container, makeFile('my.cat.jpg', 'image/jpeg'));
    const link = await saveAndGetLink();
    expect(domtoimage.toPng).toHaveBeenCalledTimes(1);
    expect(link).toEqual({ download: 'memed-my.cat.png', href: 'data:image/png;base64,AAAA' });
  });

  it('renders the meme at the original image resolution', async() => {
    const { container } = render(<Meme />);
    await uploadImage(container);
    const img = container.querySelector('img');
    Object.defineProperty(img, 'naturalWidth', { value: 1200 });
    Object.defineProperty(img, 'naturalHeight', { value: 1800 });
    const node = img.parentElement;
    Object.defineProperty(node, 'offsetWidth', { value: 300 });
    Object.defineProperty(node, 'offsetHeight', { value: 450 });

    await saveAndGetLink();

    expect(domtoimage.toPng).toHaveBeenCalledWith(node, {
      width: 1200,
      height: 1800,
      style: { transform: 'scale(4, 4)', transformOrigin: 'top left' }
    });
  });

  it('uses the name of the most recently uploaded file', async() => {
    const { container } = render(<Meme />);
    await uploadImage(container, makeFile('first.png'));
    dropFile(container.querySelector('img').closest('div').parentElement, makeFile('second.webp', 'image/webp'));
    await waitFor(() => expect(previewSrc(container)).toMatch(/^data:image\/webp/));
    const link = await saveAndGetLink();
    expect(link.download).toBe('memed-second.png');
  });
});
