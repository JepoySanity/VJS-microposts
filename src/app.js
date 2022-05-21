import { http } from "./http";
import { ui } from "./ui";
//get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

//listend for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showposts(data))
    .catch((err) => console.log(err));
}

function submitPost() {
  const title = document.querySelector("#title").value;

  const body = document.querySelector("#body").value;

  const data = {
    title,
    body,
  };

  http
    .post("http://localhost:3000/posts", data)
    .then((data) => {
      getPosts();
    })
    .catch((err) => console.log(err));
}
