createHtmlHere = document.querySelector(".blog_slider");
const createHtmlForStickyPosts = document.querySelector(".sticky_posts");
const prevBtn = document.querySelector(".prev_post");
const nextBtn = document.querySelector(".next_post");
const url = "https://www.reisesakte.no//wp-json/wp/v2/posts?_embed";

let currentIndex = 0;
let startIndex = 0;
let posts = [];

async function getBlogPosts() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    posts = result;

    displayPost(currentIndex);

    displayPosts(startIndex);

    startAutoSlide();
  } catch (error) {}
}

function displayPost(index) {
  if (index >= 0 && index < posts.length) {
    const post = posts[index];
    const featuredMedia = post._embedded["wp:featuredmedia"][0];
    const imageUrl = featuredMedia.source_url;

    if (post.sticky === true) {
      const blogPost = document.createElement("div");
      blogPost.classList.add("blog_post_slider");
      blogPost.innerHTML = `
                <img src="${imageUrl}" alt="${post.title.rendered}">
                <h2 class="h2_for_slider">${post.title.rendered}</h2>
                
            `;

      createHtmlHere.innerHTML = "";
      createHtmlHere.appendChild(blogPost);
    }
  }
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % posts.length;
    displayPost(currentIndex);
  }, 100005000);
}

function displayPosts(startIndex) {
  const endIndex = startIndex + 3;
  createHtmlForStickyPosts.innerHTML = "";

  for (let i = startIndex; i < endIndex && i < posts.length; i++) {
    const post = posts[i];
    const featuredMedia = post._embedded["wp:featuredmedia"][0];
    const imageUrl = featuredMedia.media_details.sizes.medium.source_url;

    const blogPost = document.createElement("div");
    blogPost.classList.add("featured_blog_posts");
    blogPost.innerHTML = `
                <img src="${imageUrl}" alt="${post.title.rendered}">
                <h2>${post.title.rendered}</h2>
                
            `;

    createHtmlForStickyPosts.appendChild(blogPost);
  }
}

prevBtn.addEventListener("click", function () {
  startIndex = Math.max(startIndex - 3, 0);
  displayPosts(startIndex);
});

nextBtn.addEventListener("click", function () {
  startIndex = Math.min(startIndex + 3, posts.length - 1);
  displayPosts(startIndex);
});

getBlogPosts();
