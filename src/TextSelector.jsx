import { Fields, Input, Select } from './styles';

const FONTS = [
  ['sans-serif', '*select one*'],
  ['Impact', 'Impact'],
  ['Open Sans', 'Sans Serif'],
  ['Martel', 'Serif'],
  ['Berkshire Swash', 'Fancy'],
  ['Source Code Pro', 'Monospace']
];

const SIZES = [
  ['1em', 'small'],
  ['3em', 'medium'],
  ['6em', 'big'],
  ['9em', 'too big']
];

const options = list => list.map(([value, label]) => <option key={value} value={value}>{label}</option>);

export default function TextSelector({ fields, onChange }) {
  const { topText, bottomText, textColor, font, fontSize } = fields;
  return (
    <Fields>
      <label htmlFor="topText">Top text:</label>
      <Input id="topText" name="topText" type="text" value={topText} onChange={onChange}/>
      <label htmlFor="bottomText">Bottom text:</label>
      <Input id="bottomText" name="bottomText" type="text" value={bottomText} onChange={onChange}/>
      <label htmlFor="textColor">Text color:</label>
      <Input id="textColor" name="textColor" type="color" value={textColor} onChange={onChange}/>
      <label htmlFor="font">Font:</label>
      <Select id="font" name="font" value={font} onChange={onChange}>{options(FONTS)}</Select>
      <label htmlFor="fontSize">Text Size:</label>
      <Select id="fontSize" name="fontSize" value={fontSize} onChange={onChange}>{options(SIZES)}</Select>
    </Fields>
  );
}
