import { useState } from 'react';

export default function Comment() {
  const [show, setShow] = useState<boolean>(true)
  const [text, setText] = useState<string>("")
  return (
    <div>
      {show ?
        <p className='commentLine' onClick={() => setShow(false)}>Add a comment...</p> :
        <form>
          <input type="text" className='commentLine' placeholder='Add a comment...' autoFocus defaultValue={text} onChange={(e) => setText(e.target.value)} />
          <div className='buttonGroup'>
            <button className='cancel' onClick={() => setShow(true)}>Cancel</button>
            <button className={`commentButton ${text === "" ? 'disable' : 'enable'}`}>Comment</button>
          </div>
        </form>
      }
    </div>
  )
}