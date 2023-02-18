import { useState } from 'react';
import Heading from './components/Heading';
import data from './data.json'
import './App.css';

interface AppProps {
  id: number;
  date: string;
  body: string;
}

function App() {
  const [comments, setComment] = useState<AppProps[] | []>(data.comments)

  return (
    <main className='container'>
      <div>
        <Heading comments={comments}/>
        <div></div>
      </div>
    </main>
  );
}

export default App;
