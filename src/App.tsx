import { PropsWithChildren, useEffect, useState } from 'react'
import { FeedbackOp, Samaritan, Song } from './samaritan';

export const AppWrapper = ({ children }: PropsWithChildren<{}>) => {
  return <div className='w-screen h-screen flex justify-center items-center p-5'>
    {children}
  </div>
} 

export const App = () => {
  const [item, setItem] = useState<Song | undefined>(undefined);
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
  return <div className='md:max-w-xl'>
    <div>
      <img className='max-w-full w-full' src={currentSong.image} />
      <h1 className='text-5xl p-4 pb-1 pl-0 max-w-full font-serif font-bold'>{currentSong.name}</h1>
      <h2 className='text-3xl p-3 pl-0 max-w-full font-serif'>{currentSong.artist}</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-10">
      <button className='bg-gray-100 hover:bg-gray-400 p-5 rounded-md font-bold' onClick={() => { feedback(currentSong.id, 'positive') }}>Like</button>
      <button className='bg-gray-100 hover:bg-gray-400 p-5 rounded-md font-bold' onClick={() => { feedback(currentSong.id, 'negative') }}>Dislike</button>
      <button className='bg-gray-100 hover:bg-gray-400 p-5 rounded-md font-bold col-span-2' onClick={() => { done() }}>Submit</button>
    </div>
  </div>
}