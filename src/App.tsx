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
    let temp = []
    for(const  item of data.comments) {
      temp.push(item.body)
    }
    console.log(temp)
    const apiKey = process.env.REACT_APP_API_KEY
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        prompt: `Emoticon is a representation of a facial expression such as:-) (representing a smile), formed by various combinations of keyboard characters and used to convey the writer's feelings or intended tone.
        Context: Array of objects contain keys (id, date, body). 
        Anaylze the array of objects ${data.comments} to see which key=body contain value=string that are not emoticon.`,
        model: "text-davinci-003",
        max_tokens: 256,
        top_p: 1,
        temperature: 0.7,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // if (data.choices[0].text === "\n\nNo") {
        //   console.log(text[i].body)
        //   temp.push(text[i])
        // }
      })
      .catch(error => console.error(error))
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
