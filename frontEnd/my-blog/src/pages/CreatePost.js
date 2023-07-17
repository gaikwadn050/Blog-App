import { useState } from 'react';
import { useRef } from "react"
import { Navigate, useParams } from "react-router-dom";
//mport ReactQuill from 'react-quill';
//  import 'react-quill/dist/quill.snow.css';
import JoditEditor from "jodit-react"

export default function CreatePost() {
  const editor = useRef(null)
  const { id } = useParams();
  const [content, setContent] = useState('')
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch('http://localhost:5555/api/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    })
    if (response.ok) {
      setRedirect(true);
    }
  }

  // const [post, setPost] = useState({
  //     title: '',
  //     content: '',
  //     categoryId: ''
  // })

  //const [categories, setCategories] = useState([])

  //const [user, setUser] = useState(undefined)
  // const [content,setContent] =useState('');
  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (

    <form onSubmit={createNewPost}>
      <h1> What is in your mind ?</h1>
      <input type='title'
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <input type='summary'
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
      />
      <input type='file'
        onChange={ev => setFiles(ev.target.files)} />
      {/*<ReactQuill value={content} module={modules}/> */}
      <JoditEditor ref={editor}
        value={content}
        // onChange={(Content) => setContent(Content)}
        onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
};