const baseUrl = `https://jsonplaceholder.typicode.com`;
const spinner = document.getElementById('spinner');
const commentsContainer = document.getElementById('commentsContainer');

function fetchCommentsByPostId(postId) {
      spinner.classList.remove('d-none'); 
      commentsContainer.innerHTML = '';
  if (postId) {
    fetch(`${baseUrl}/comments?postId=${postId}`)
      .then((response) => response.json())

      .then((comments) => {
       spinner.classList.add('d-none');
       if (comments.length>0){
        comments.forEach((comment) => {
          const commentCard = document.createElement("div");
          commentCard.classList.add("commentCards");

          const name = document.createElement("h3");
          name.innerText = comment.name;

          const body = document.createElement("p");
          body.innerText = comment.body;

          commentCard.append(name, body);
          commentsContainer.appendChild(commentCard);
        });
        } else {
          commentsContainer.innerHTML = "<p>No Post Found.</p>";
      }
  })
      .catch((error) => {
         console.error("Error:", error);
         spinner.classList.add('d-none');
         commentsContainer.innerHTML = "<p>Error loading comments.</p>";
      });
  } else {
    console.error("No postId found in the URL");
    spinner.classList.add('d-none');
    commentsContainer.innerHTML = "<p>No Post ID found.</p>";
  }
}
function goBackToHomePage() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const postId = new URLSearchParams(window.location.search).get("postId");
  fetchCommentsByPostId(postId);

  document
    .getElementById("backBtn")
    .addEventListener("click", goBackToHomePage);
});
