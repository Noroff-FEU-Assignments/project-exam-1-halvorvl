createHtmlHere = document.querySelector(".blog_slider");
const createHtmlForStickyPosts = document.querySelector(".sticky_posts");
const createHtmlForStickyPostsTablet = document.querySelector(
  ".sticky_posts_tablet"
);

const prevBtn = document.querySelector(".prev_post");
const nextBtn = document.querySelector(".next_post");
const prevBtnTablet = document.querySelector(".prev_post_tablet");
const nextBtnTablet = document.querySelector(".next_post_tablet");
const url = "https://www.reisesakte.no//wp-json/wp/v2/posts?_embed&per_page=20";

let currentIndex = 0;
let startIndex = 0;
let posts = [];
let stickyPosts = [];

async function getBlogPosts() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    posts = result;

    for (let i = 0; i < result.length; i++)
      if (result[i].sticky === true) {
        stickyPosts = result[i];
      }

    console.log(stickyPosts);

    displayPost(currentIndex);

    displayPosts(startIndex);

    displayPostsTablet(startIndex);

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
               <a href="blogpost.html?id=${post.id}">
                <img class="slider_image" src="${imageUrl}" alt="${post.title.rendered}">
                 
                <h2 class="h2_for_slider">${post.title.rendered}</h2>
                  </a>
                
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
  }, 100002000);
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
                <a href="blogpost.html?id=${post.id}">
                <img class="slider_image_newest" src="${imageUrl}" alt="${post.title.rendered}">
                
                <h2>${post.title.rendered}</h2>
                
                </a>
                
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

function displayPostsTablet(startIndex) {
  const endIndex = startIndex + 2;
  createHtmlForStickyPostsTablet.innerHTML = "";

  for (let i = startIndex; i < endIndex && i < posts.length; i++) {
    const post = posts[i];
    const featuredMedia = post._embedded["wp:featuredmedia"][0];
    const imageUrl = featuredMedia.media_details.sizes.medium.source_url;

    const blogPost = document.createElement("div");
    blogPost.classList.add("featured_blog_posts_tablet");
    blogPost.innerHTML = `
                <a href="blogpost.html?id=${post.id}">
                <img class="slider_image_newest" src="${imageUrl}" alt="${post.title.rendered}">
                
                <h2>${post.title.rendered}</h2>
                
                </a>
                
            `;

    createHtmlForStickyPostsTablet.appendChild(blogPost);
  }
}

prevBtnTablet.addEventListener("click", function () {
  startIndex = Math.max(startIndex - 2, 0);
  displayPostsTablet(startIndex);
});

nextBtnTablet.addEventListener("click", function () {
  startIndex = Math.min(startIndex + 2, posts.length - 1);
  displayPostsTablet(startIndex);
});

getBlogPosts();
