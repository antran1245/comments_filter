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
  const [len, setLen] = useState<number>(data.comments.length)
  const file = data.comments
  
  /**
   * Process the existing comments to seperate between comments and emoticons
   * Pass the file/data into the prompt and then send the prompt with the OpenAi API call
   */
  useEffect(() => {
    const prompt = `
    Content: Emoticon sentence is a sentence where there is a majority of emojis, emoticons, or abbreviation slang terms in the sentence.

    Given an array of objects, determine if the 'body' key of each object is an emoticon sentence. Return a boolean array with the same length as the input array, where each element is true if the corresponding object when split into an array by space between word and 80% more of the array is emoticon, and false otherwise.

    Array:
    ${JSON.stringify(data.comments, null, 2)}

    Output:
    `;
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY
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
        if("choices" in data) {
          const result = JSON.parse(data.choices[0].text.trim());
          
          // Filter the result out from an array of boolean
          let tempEmoticons = []
          let tempComments = []
          for(let i = 0; i < result.length; i++) {
            if(result[i]) {
              tempEmoticons.push(file[i])
            } else {
              tempComments.push(file[i])
            }
          }
          setComments(tempComments)
          setEmoticons(tempEmoticons)
        }
      })
      .catch(error => console.error(error))
  }, [file])

  /**
   * Process the input of the comment and then add them to the proper array.
   * @param text -> string input
   */
  const processComment = (text: string) => {
    const prompt = `Content: Emoticon sentence is a sentence where there is a majority of emojis, emoticons, or abbreviation slang terms in the sentence.
    Given a sentence, determine if the sentence is an emoticon sentence. Return an array with an element of true if the corresponding sentence is an emoticon sentence, or false otherwise.
    Sentence: ${JSON.stringify(text)}
    Output:
    `
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

        // Parse the data, then push the text into an obj format for {id, date, body}.
        // Push into the proper array.
        const result = JSON.parse(data.choices[0].text.trim());
        const obj = { id: len + 1, date: (new Date()).toLocaleDateString('en-US'), body: text}
        if(result[0]) {
          setEmoticons([...emoticons, obj])
        } else {
          setComments([...comments, obj])
        }
        setLen(len+1)
      })
      .catch(err => console.log("Create Comment: ",err))
  }

  const reverseComment = () => {
    let tempComment = [...comments].reverse()
    let tempEmoticons = [...emoticons].reverse()
    setComments(tempComment)
    setEmoticons(tempEmoticons)
  }
  return (
    <main className='container'>
      <div>
        <Heading comments={comments} emoticons={emoticons} reverseComment={reverseComment}/>
        <Comment processComment={processComment}/>
        <List comments={comments} emoticons={emoticons}/>
      </div>
    </main>
  );
}

export default App;
