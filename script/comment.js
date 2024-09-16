const baseUrl = `https://jsonplaceholder.typicode.com`;

function fetchCommentsByPostId(postId) {
  const commentsContainer = document.getElementById("commentsContainer");
  if (postId) {
    fetch(`${baseUrl}/comments?postId=${postId}`)
      .then((response) => response.json())

      .then((comments) => {
        commentsContainer.innerHTML = "";

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
      })
      .catch((error) => console.error("Error:", error));
  } else {
    console.error("No postId found in the URL");
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
