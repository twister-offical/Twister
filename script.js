// Dummy Data (Later will be connected to Supabase)
let posts = [];

// Function to render posts
function renderPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        
        const mediaElement = post.mediaType === 'image' ?
            `<img src="${post.media}" alt="Post Image">` :
            `<video src="${post.media}" controls></video>`;

        postElement.innerHTML = `
            ${mediaElement}
            <div class="post-text">${post.text}</div>
            <div class="reactions">
                <button onclick="likePost(${index})">👍 Like</button>
                <button onclick="reportPost(${index})">🚩 Report</button>
            </div>
            <div class="comment-section" id="comment-section-${index}">
                <textarea class="comment-input" placeholder="Add a comment..."></textarea>
                <button class="comment-button" onclick="addComment(${index})">Post Comment</button>
                <div class="comments-list" id="comments-list-${index}">
                    ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
                </div>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Function to handle a new post submission
document.getElementById('post-button').addEventListener('click', function () {
    const fileInput = document.getElementById('file-input');
    const textInput = document.getElementById('post-text');

    if (fileInput.files.length === 0 || textInput.value.trim() === "") return;

    const file = fileInput.files[0];
    const mediaType = file.type.startsWith('image') ? 'image' : 'video';

    const newPost = {
        media: URL.createObjectURL(file),
        mediaType: mediaType,
        text: textInput.value,
        likes: 0,
        reports: 0,
        comments: []
    };

    posts.push(newPost);
    renderPosts();
    fileInput.value = '';
    textInput.value = '';
});

// Like post function
function likePost(postIndex) {
    posts[postIndex].likes += 1;
    renderPosts();
}

// Report post function
function reportPost(postIndex) {
    posts[postIndex].reports += 1;

    if (posts[postIndex].reports > 10) {
        posts.splice(postIndex, 1);  // Delete post if over 10 reports
    }

    renderPosts();
}

// Add comment to a post
function addComment(postIndex) {
    const commentInput = document.querySelector(`#comment-section-${postIndex} .comment-input`);
    const comment = commentInput.value.trim();

    if (comment) {
        posts[postIndex].comments.push(comment);
        commentInput.value = '';
        renderPosts();
    }
}

// Initial rendering of posts
renderPosts();
