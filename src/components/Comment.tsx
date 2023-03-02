import { useState } from 'react';

interface CommentProps {
  processComment: (text: string) => void
}

export default function Comment({processComment} : CommentProps) {
  const [show, setShow] = useState<boolean>(true)
  const [text, setText] = useState<string>("")

  const submitComment = () => {
    processComment(text)
    setText("")
  }
  return (
    <div>
      {show ?
        <p className='commentLine' onClick={() => setShow(false)}>Add a comment...</p> :
        <form>
          <input type="text" className='commentLine' placeholder='Add a comment...' autoFocus value={text} onChange={(e) => setText(e.target.value)} />
          <div className='buttonGroup'>
            <button type='button' className='cancel' onClick={() => setShow(true)}>Cancel</button>
            <button type='button' className={`commentButton ${text === "" ? 'disable' : 'enable'}`} onClick={() => submitComment()}>Comment</button>
          </div>
        </form>
      }
    </div>
  )
}