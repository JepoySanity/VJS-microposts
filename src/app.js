import { http } from "./http";
import { ui } from "./ui";
//get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

//listend for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);

//listen for delete post
document.querySelector("#posts").addEventListener("click", deletePost);

//listen for edit post
document.querySelector("#posts").addEventListener("click", enableEdit);

//listen for cancel
document.querySelector(".card-form").addEventListener("click", cancelEditState);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showposts(data))
    .catch((err) => console.log(err));
}

function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  const data = {
    title,
    body,
  };
  if (title !== "" && body !== "") {
    //check if id exist, if exist = create state
    if (id === "") {
      //create post
      http
        .post("http://localhost:3000/posts", data)
        .then((data) => {
          ui.showAlert("Post added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch((err) => console.log(err));
    } else {
      //update post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          ui.showAlert("Post updated", "alert alert-success");
          ui.changeFormState("add");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
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

function enableEdit(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;

    const data = {
      id,
      title,
      body,
    };

    ui.fillForm(data);
  }
}

function cancelEditState(e) {
  e.preventDefault();
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
}
