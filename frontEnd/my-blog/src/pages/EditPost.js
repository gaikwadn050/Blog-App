import { useState, useEffect } from 'react';
import { useRef } from "react"
import { Navigate, useParams } from "react-router-dom";
// import Editor from "../Editor"
import JoditEditor from "jodit-react"
import axios from "axios"

export default function EditPost() {
  const editor = useRef(null)
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  console.log(title, summary,content,id)
  useEffect(() => {
    //     fetch('http://localhost:5555/api/post/'+id)
    //       .then(response => {
    //         response.json().then(postInfo => {
    // console.log(postInfo,"postInfo", id)
    //           setTitle(postInfo.title);
    //           setContent(postInfo.content);
    //           setSummary(postInfo.summary);
    //         });
    //       });
    loadPost()

  }, [title]);

  const loadPost = () => {
    axios.get("http://localhost:5555/api/post/" + id).then(postInfo => {
      console.log(postInfo, "postInfo")
      setTitle(postInfo.title);
      setContent(postInfo.content);
      setSummary(postInfo.summary);
    });
  };


  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('/api/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }


  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (

    <form onSubmit={updatePost}>
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

      <JoditEditor ref={editor}
        value={content}
        // onChange={(Content) => setContent(Content)}
        onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Update post</button>
    </form>
  )

} 