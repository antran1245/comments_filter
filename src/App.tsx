import { useState } from 'react';
import Heading from './components/Heading';
import Comment from './components/Comment';
import List from './components/List';
import data from './data.json'
import './App.css';

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
        <List comments={comments}/>
      </div>
    </main>
  );
}

export default App;
