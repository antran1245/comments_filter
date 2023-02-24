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
  const [comments, setComments] = useState<AppProps[] | []>([])
  const [emoticons, setEmoticons] = useState<AppProps[] | []>([])
  const file = data.comments

  useEffect(() => {
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
        
        let tempEmoticons = []
        let tempComments = []
        for(let i = 0; i < result.length; i++) {
          if(result[i]) {
            tempEmoticons.push(file[i])
          } else {
            tempComments.push(file[i])
          }
        }
        console.log(tempEmoticons, tempComments)
        setComments(tempComments)
        setEmoticons(tempEmoticons)
      })
      .catch(error => console.error(error))
  }, [file])

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
