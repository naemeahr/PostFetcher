const baseUrl = "https://jsonplaceholder.typicode.com";

const postsContainer = document.getElementById("postsContainer");
const searchBtn = document.getElementById("searchBtn");
const spinner = document.getElementById("spinner");
const postIdInput = document.getElementById("postId");

function fetchAndDisplayPost(postId) {
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
      })
      .catch((error) => console.error("Error:", error));
  } else {
    alert("please enter a valid postId.");
  }
}

document.getElementById("searchBtn").addEventListener("click", function () {
  spinner.classList.remove('d-none');

const postId =postIdInput.value.trim();
  if (postId) {
    fetchAndDisplayPost(postId);
  } else {
    alert("Please enter a valid Post ID.");
  }
  setTimeout(function () {
   
     spinner.classList.add('d-none');
  }, 1000);
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

  commentButton.addEventListener("click", () => {
    goToComments(post.id);
  });

  div.append(title, body, postId, commentButton);
  return div;
}
function renderPosts(post) {
  postsContainer.innerHTML = "";
  post.forEach((post) => {
    const postCard = createPostCard(post);
    postsContainer.appendChild(postCard);
  });
}

function goToComments(postId) {
  window.location.href = `comment.html?postId=${postId}`;
}

fetchPosts();
