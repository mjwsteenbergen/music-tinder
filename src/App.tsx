import { useEffect, useState } from 'react'
import './App2.css'
import { FeedbackOp, Samaritan, Song } from './samaritan';
import Spotify from 'spotify-web-api-js';

export const App2 = () => {
  const [item, setItem] = useState<Song|undefined>(undefined);
  const [done, isDone] = useState(false);
  const samaritan = new Samaritan()


  const onFeedback: DisplayProps['feedback'] = (song, feedback) => { 
    samaritan.sendFeedback({
      feedback,
      id: song
    }).then(i => {
      setItem(i);
    });
  }

  const onDone = () => {
    isDone(true);
    samaritan.submit();
  }

  useEffect(() => {
    samaritan.getSongs().then(i => setItem(i));
  }, []);

  if (done) {
    return <h1>Now playing your music</h1>
  }

  if (item != null) {
    return <Display currentSong={item} feedback={onFeedback} done={onDone} />
  }

  return <div><h1>waiting for data</h1></div>;
} 

type DisplayProps = {
  currentSong: Song;
  feedback: (song: string, feedback: FeedbackOp) => void;
  done: () => void;
}

const Display = ({ currentSong, feedback, done }: DisplayProps) => {
  return <div>
    <div id="display">
      <img id="album-cover" src={currentSong.image} />
      <h1>{currentSong.name}</h1>
      <h2>{currentSong.artist}</h2>
    </div>
    <div id="button-holder">
      <button id="positive" onClick={() => { feedback(currentSong.id, 'positive') }}>Like</button>
      <button id="negative" onClick={() => { feedback(currentSong.id, 'negative') }}>Dislike</button>
      <button id="submit" onClick={() => { done() }}>Submit</button>
    </div>
  </div>
}