const baseUrl = "https://jsonplaceholder.typicode.com";
document.addEventListener("DOMContentLoaded", () => {
  fetchPosts();
});

const postsContainer = document.getElementById("postsContainer");
const searchBtn = document.getElementById("searchBtn");
const spinner = document.getElementById("spinner");
const icon = document.getElementById("icon");
const postIdInput = document.getElementById("postId");
const modalBody = document.getElementById("modalCommentsBody");
const modalSpinner = document.getElementById("modalSpinner");


function toggleSpinner(spinner, show) {
  if (show) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
}

function fetchAndDisplayPost(postId) {
  return new Promise((resolve) => {
    if (postId) {
      fetch(`${baseUrl}/posts/${postId}`)
        .then((response) => response.json())
        .then((post) => {
          postsContainer.innerHTML = "";
          if (post && postId) {
            const postCard = createPostCard(post);
            postsContainer.appendChild(postCard);
          } else {
            postsContainer.innerHTML = "<p>Not Post Found..</p>";
          }
          resolve();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error fetching post.");
          resolve();
        });
    } else {
      alert("please enter a valid postId.");
      resolve();
    }
  });
}

document.getElementById("searchBtn").addEventListener("click", function () {
  toggleSpinner(spinner, true);
  postsContainer.innerHTML = "";
  postsContainer.style.display = "none";

  const postId = postIdInput.value.trim();
  if (postId) {
    fetchAndDisplayPost(postId).then(() => {
      toggleSpinner(spinner, false);
      postsContainer.style.display = "block";
    });
  } else {
    alert("Please enter a valid Post ID.");
    toggleSpinner(spinner, false);
  }
});

function fetchPosts() {
  fetch(`${baseUrl}/posts`)
    .then((response) => response.json())
    .then((posts) => {
      if (Array.isArray(posts)) {
        renderPosts(posts);
      } else {
        console.error("Posts is not an array:", posts);
      }
    })
    .catch((error) => {
      console.error("Error", error);
    });
}

function createPostCard(post) {
  const div = document.createElement("div");
  const title = document.createElement("h2");
  const body = document.createElement("p");
  const postId = document.createElement("id");
  const commentButton = document.createElement("button");

  title.innerText = post.title;
  body.innerText = post.body;
  postId.innerText = `Post ID: ${post.id}`;
  commentButton.innerText = "View Comments";

  div.classList.add("postsContainer");
  div.classList.add("postCard");
  title.classList.add("postTitle");
  body.classList.add("postBody");
  commentButton.classList.add("commentButton");
  commentButton.classList.add("view-comments-btn");
  commentButton.setAttribute("data-post-id", post.id);

  commentButton.addEventListener("click", () => {
    openCommentsModal(post.id);
  });

  div.append(title, body, postId, commentButton);
  return div;
}
function renderPosts(posts) {
  postsContainer.innerHTML = "";
  posts.forEach((post) => {
    const postCard = createPostCard(post);
    postsContainer.appendChild(postCard);
  });
}

function fetchCommentsByPostId(postId) {
  return new Promise((resolve, reject) => {
    toggleSpinner(modalSpinner, true);
    modalBody.innerHTML = "";
    if (postId) {
      fetch(`${baseUrl}/comments?postId=${postId}`)
        .then((response) => response.json())
        .then((comments) => {
          toggleSpinner(modalSpinner, false);


          if (comments.length > 0) {
            comments.forEach((comment) => {
              const commentCard = document.createElement("div");
              commentCard.classList.add("commentCards");
              const name = document.createElement("h3");
              name.innerText = comment.name;

              const body = document.createElement("p");
              body.innerText = comment.body;
              commentCard.append(name, body);
              modalBody.appendChild(commentCard);
            });
          } else {
            modalBody.innerHTML = "<p>No Post Found.</p>";
          }
          resolve();
        })
        .catch((error) => {
          console.error("Error:", error);
          modalBody.innerHTML = "<p>Error loading comments.</p>";
          toggleSpinner(modalSpinner, false);
          reject(error);
        });
    } else {
      modalBody.innerHTML = "<p>No Post ID found.</p>";
      toggleSpinner(modalSpinner, false);
      reject(new Error("Invalid postId"));
    }
  });
}
function openCommentsModal(postId) {
  const commentsModal = new bootstrap.Modal(
    document.getElementById("commentsModal")
  );
  commentsModal.show();
  toggleSpinner(modalSpinner, true);
  modalBody.innerHTML = "";
  fetchCommentsByPostId(postId)
    .then(() => {
      
      toggleSpinner(modalSpinner, false);
    })
    .catch((error) => {
      console.error("Error loading comments:", error);
      toggleSpinner(modalSpinner, false);
    });
}
