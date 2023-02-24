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
    // console.log(temp)
    const prompt = `
    Content: Emoticon sentence is a sentence where there is a majority of emojis, emoticons, or abbreviation slang terms in the sentence.

    Given an array of objects, determine if the 'body' key of each object is an emoticon sentence. Return a boolean array with the same length as the input array, where each element is true if the corresponding object is an emoticon sentence, and false otherwise.

    Array:
    ${JSON.stringify(data.comments, null, 2)}

    Output:
    `;
    const apiKey = process.env.REACT_APP_API_KEY
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "text-davinci-003",
        max_tokens: 1024,
        top_p: 1,
        temperature: 1,
        n: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })
      .then(response => response.json())
      .then(data => {
        const output = data.choices[0].text.trim();
        const result = JSON.parse(output);
        console.log(result);
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
