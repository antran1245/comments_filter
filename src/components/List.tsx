
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
}

export default function List({comments} : ListProps) {
  return(
    <div>
      {comments.map((item: AppProps, index: number) => {
        return <div key={index} className="commentBox">
          <p>{item.date}</p>
          <p>{item.body}</p>
        </div>
      })}
    </div>
  )
}