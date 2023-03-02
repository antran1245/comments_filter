import sortIcon from '../assets/sort_icon.svg'
import { useEffect, useState } from 'react';

interface HeadingProps {
  comments: {
    id: number;
    date: string;
    body: string;
  }[] | [];
  emoticons: {
    id: number;
    date: string;
    body: string;
  }[] | [];
  reverseComment: () => void
}

export default function Heading({ comments, emoticons, reverseComment } : HeadingProps) {
  const [sort, setSort] = useState<boolean>(false)
  const [display, setDisplay] = useState<{[key: string]: number}>({})

  /**
   * Filter out the emojis from emoticons. Then pushing to array to show display.
   */
  useEffect(() => {
    let emojis : {[key: string] : number} = {}
    for(let i = 0; i < emoticons.length; i++) {
      let words = emoticons[i].body.split(' ')
      while(words.length > 0) {
        let word = words.pop()
        if (word && /\p{Emoji}/u.test(word)) {
          if(word in emojis) {
            emojis[word]++
          } else {
            emojis[word] = 1
          }
        }
      }
    }
    setDisplay(emojis)
  }, [emoticons])
  
  // Reversing the display of the comments depending on the date.
  const reversingIcon = () => {
    setSort(!sort)
    reverseComment()
  }
  return(
    <>
      <div>
        <img src={"https://placehold.jp/1080x500.png"} alt="placeholder video"/>
      </div>
      <div>
        <h1>
          Comment Section
        </h1>
        <p>
          Emoticons
          {Object.keys(display).map((item, index) => {
            return <span key={index}>{item}</span>
          })}
        </p>
      </div>
      <div className="countComment">
        <p>{comments.length !== 0 ? comments.length+emoticons.length : ""} Comments</p>
        <div>
          <img src={sortIcon} alt="sort" className={`icon ${sort? 'vertical': ''}`} onClick={() => reversingIcon()}/>
          <p>Sort by {sort? 'newest' : 'oldest'}</p>
        </div>
      </div>
    </>
  )
}