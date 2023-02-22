import { useEffect, useState } from 'react';
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
  const [emoticons, setEmoticons] = useState<AppProps[] | []>([])
  useEffect(() => {
    let temp : any[] = []
    const apiKey = process.env.REACT_APP_API_KEY
    // for(let i = 0; i < comments.length; i++) {
      // fetch('https://api.openai.com/v1/engines/davinci/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer '+apiKey
      //   },
      //   body: JSON.stringify({
      //     prompt: "Please analyze this comment to determine if it is an emoticon comment or not:\n\n" + comments[0].body,
      //     max_tokens: 1,
      //     temperature: 0,
      //     // model: "text-davinci-003",
      //     stop: ["\n"]
      //   })
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data)
      //     // if (data.choices[0].text) {
      //     //   temp.push(comments[i])
      //     // }
      //   })
      //   .catch(error => console.error(error))
    // }
    console.log(temp)
  }, [])

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
