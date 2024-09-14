document.getElementById('search-btn').addEventListener('click',function() {
    const postId =document.getElementById('postId').value ;
    const postsContainer = document.getElementById('postsContainer');

    if(postId){
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
          .then(response => response.json())
          .then(post => {
            postsContainer.innerHTML='';
            if (post && post.id) {
                const div = document.createElement('div');
                const title = document.createElement('h2');
                const body = document.createElement('p');
                title.innerText = post.title;
                body.innerText = post.body;
                div.classList.add('post-card');
                div.append(title,body);
                postsContainer.appendChild(div);
            } else {
                postsContainer.innerHTML = '<p>No post found.</p>';
            }
            

        })
        .catch(error => console.error('Error:', error));
   }
})
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response=> response.json())
  .then(posts => {
    if (Array.isArray(posts)) { 

      const Container = document.getElementById('postsContainer');
      
      posts.forEach(post => {

        const div = document.createElement('div');
        const title =document.createElement('h2');
        const body = document.createElement('p');
        const postId = document.createElement('id');
        const commentButton =document.createElement('button');
        
        
        
        title.innerText=post.title;
        body.innerText=post.body;
        postId.innerText=`Post ID: ${post.id}`;
        commentButton.innerText='View Comments';
        
        
        div.classList.add('postsContainer');
        div.classList.add('post-card');
        title.classList.add('post-title');
        body.classList.add('post-body');
        commentButton.classList.add('comment-card');

        commentButton.addEventListener('click',()=>{
            window.location.href=`comment.html?postId=${post.id}`;
        })
        
        div.append(title,body,postId,commentButton);
        Container.appendChild(div);
   
});
    } else {
        console.error('Posts is not an array:', posts);
    }
})
.catch(error=>{console.error("Error",error)});


