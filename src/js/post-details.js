window.addEventListener('DOMContentLoaded', () => {
    let postId = new URL(location.href).searchParams.get('id');
    const urlGetPost = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const urlGetComments = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

    fetch(urlGetPost)
        .then(response => response.json())
        .then(post => {
            const postInfo = document.getElementById('post-info');
            postInfo.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;
        });

    fetch(urlGetComments)
        .then(response => response.json())
        .then(comments => {
            const commentsSection = document.getElementById('comments-section');
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
                    <h3>${comment.name}</h3>
                    <p>${comment.body}</p>
                    <small>${comment.email}</small>
                `;
                commentsSection.appendChild(commentElement);
            });
        });
});
