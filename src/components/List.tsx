import { useState } from "react";

interface AppProps {
  id: number;
  date: string;
  body: string;
}

interface ListProps {
  comments: {
    id: number;
    date: string;
    body: string;
  }[] | []
  emoticons: {
    id: number;
    date: string;
    body: string;
  }[] | []
}

export default function List({ comments, emoticons } : ListProps) {
  const [selection, setSelection] = useState<boolean>(true)
  return(
    <div>
      <div className="tabGroup">
        <p className={`tab ${selection? 'active' : ''}`} onClick={() => setSelection(true)}>Comments</p>
        <p className={`tab ${selection ? '' : 'active'}`} onClick={() => setSelection(false)}>Emoticons</p>
      </div>
      {
        selection?
        comments.map((item: AppProps, index: number) => {
          return <div key={index} className="commentBox">
            <p>Date Posted: {item.date}</p>
            <p>{item.body}</p>
          </div>
        }):
        emoticons.map((item: AppProps, index: number) => {
          return <div key={index} className="commentBox">
            <p>Date Posted: {item.date}</p>
            <p>{item.body}</p>
          </div>
        })
      }
    </div>
  )
}