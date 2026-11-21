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

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('Meme', () => {
  it('connects every label to its form control', () => {
    render(<Meme />);
    ['Top text:', 'Bottom text:', 'Text color:', 'Font:', 'Text Size:', 'Image URL:'].forEach(label => {
      expect(screen.getByLabelText(label)).toBeTruthy();
    });
  });

  it('shows typed top and bottom text on the meme', () => {
    const { container } = render(<Meme />);
    change(field(container, 'topText'), 'HELLO');
    change(field(container, 'bottomText'), 'WORLD');
    expect(screen.getByText('HELLO')).toBeTruthy();
    expect(screen.getByText('WORLD')).toBeTruthy();
  });

  it('shows an uploaded image in the meme preview', async () => {
    const { container } = render(<Meme />);
    const file = new File(['pixels'], 'cat.png', { type: 'image/png' });
    fireEvent.change(field(container, 'image'), { target: { files: [file] } });
    await waitFor(() => {
      expect(container.querySelector('img').getAttribute('src')).toMatch(/^data:image\/png;base64,/);
    });
  });

  it('applies color, font and size changes to the meme text', () => {
    const { container } = render(<Meme />);
    change(field(container, 'topText'), 'STYLE ME');
    change(field(container, 'textColor'), '#ff0000');
    change(field(container, 'font'), 'Martel');
    change(field(container, 'fontSize'), '6em');
    const style = spanStyle('STYLE ME');
    expect(style.color).toBe('rgb(255, 0, 0)');
    expect(style.fontFamily).toContain('Martel');
    expect(style.fontSize).toBe('6em');
  });

  it('clears everything and restores default styling on Start Over', async () => {
    const { container } = render(<Meme />);
    change(field(container, 'topText'), 'GONE');
    change(field(container, 'bottomText'), 'SOON');
    change(field(container, 'textColor'), '#ff0000');
    change(field(container, 'fontSize'), '9em');
    change(field(container, 'font'), 'Impact');
    const file = new File(['pixels'], 'cat.png', { type: 'image/png' });
    fireEvent.change(field(container, 'image'), { target: { files: [file] } });
    await waitFor(() => expect(container.querySelector('img').getAttribute('src')).toBeTruthy());

    fireEvent.click(screen.getByText('Start Over'));

    expect(field(container, 'topText').value).toBe('');
    expect(field(container, 'bottomText').value).toBe('');
    expect(screen.queryByText('GONE')).toBeNull();
    expect(container.querySelector('img').getAttribute('src')).toBeFalsy();
    expect(field(container, 'textColor').value).toBe('#ffffff');
    expect(field(container, 'fontSize').value).toBe('3em');
    expect(field(container, 'font').value).toBe('sans-serif');
  });

  it('downloads the meme as meme.png when saving', async () => {
    domtoimage.toPng.mockResolvedValue('data:image/png;base64,AAAA');
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function() {
      click.lastLink = { download: this.download, href: this.href };
    });
    render(<Meme />);

    fireEvent.click(screen.getByText('Save Meme to Computer'));

    await waitFor(() => expect(click).toHaveBeenCalledTimes(1));
    expect(domtoimage.toPng).toHaveBeenCalledTimes(1);
    expect(click.lastLink).toEqual({ download: 'meme.png', href: 'data:image/png;base64,AAAA' });
    click.mockRestore();
  });
});
