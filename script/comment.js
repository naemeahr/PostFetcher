
document.addEventListener('DOMContentLoaded', () => {
    const postId = new URLSearchParams(window.location.search).get('postId'); 
    if (postId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`) 
    
        .then(response => response.json())
        .then(comments => {
            const commentsContainer = document.getElementById('comments-container');
            comments.forEach(comment => {
                const commentCard = document.createElement('div');
                commentCard.classList.add('comment-card');
                
                const name = document.createElement('h3');
                name.innerText = comment.name;
                
                const body = document.createElement('p');
                body.innerText = comment.body;

                commentCard.append(name, body);
                commentsContainer.appendChild(commentCard);
                
                
            });
          
        })
           .catch(error => console.error('Error:', error));

} else {
            console.error('No postId found in the URL');
        }

        const backButton = document.getElementById('back-btn');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.href = "index.html"; 
            });
        } else {
            console.error('Back button not found');
        }
    });
