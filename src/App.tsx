import { useState } from 'react';
import Heading from './components/Heading';
import data from './data.json'
import './App.css';
import Comment from './components/Comment';

interface AppProps {
  id: number;
  date: string;
  body: string;
}

function App() {
  const [comments, setComments] = useState<AppProps[] | []>(data.comments)
  return (
    <main className='container'>
      <div>
        <Heading comments={comments}/>
        <Comment/>
      </div>
    </main>
  );
}

export default App;
