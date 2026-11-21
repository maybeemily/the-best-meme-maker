import Meme from './Meme';
import { H1, InfoFooter } from './styles';

export default function App() {
  return (
    <>
      <H1>THE BEST MEME MAKER</H1>
      <Meme />
      <InfoFooter>
        the best meme maker is made by <a href="https://github.com/maybeemily">emily baier</a>
      </InfoFooter>
    </>
  );
}
