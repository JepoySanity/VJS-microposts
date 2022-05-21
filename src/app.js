import { http } from "./http";
import { ui } from "./ui";
//get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

//listend for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);

//listen for delete post
document.querySelector("#posts").addEventListener("click", deletePost);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showposts(data))
    .catch((err) => console.log(err));
}

function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  if (title !== "" && body !== "") {
    const data = {
      title,
      body,
    };

    http
      .post("http://localhost:3000/posts", data)
      .then((data) => {
        ui.showAlert("Post added", "alert alert-success");
        ui.clearFields();
        getPosts();
      })
      .catch((err) => console.log(err));
  } else {
    ui.showAlert("Input cannot be empty!", "alert alert-danger");
  }
}

function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("are you sure?")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert("Post Removed", "alert alert-success");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}
