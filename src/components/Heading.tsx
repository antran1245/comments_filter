import sortIcon from '../assets/sort_icon.svg'


interface HeadingProps {
  comments: {
    id: number;
    date: string;
    body: string;
  }[] | []
}

export default function Heading({comments} : HeadingProps) {
  return(
    <>
      <h1>
        Comment Section
      </h1>
      <div className="countComment">
        <p>{comments.length !== 0 ? comments.length : ""} Comments</p>
        <div>
          <img src={sortIcon} alt="sort" className='icon' />
          <p>Sort by</p>
        </div>
      </div>
    </>
  )
}