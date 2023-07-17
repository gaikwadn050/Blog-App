import { useEffect, useState } from "react";
import Post from "../Post";
//import LoginPage from "./LoginPage";
//import RegisterPage from "./RegisterPage";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  console.log(posts)
  useEffect(() => {
    fetch('http://localhost:5555/api/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);

      });
    });
  }, []);

  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post key={post._id}{...post} />
      ))}
    </>
  );
}