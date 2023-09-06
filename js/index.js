createHtmlHere = document.querySelector(".blog_slider");
const prevBtn = document.querySelector(".prev_post");
const nextBtn = document.querySelector(".next_post");

let currentIndex = 0;
let posts = [];

function getBlogPosts() {
  fetch("https://www.reisesakte.no//wp-json/wp/v2/posts?_embed")
    .then((response) => response.json())
    .then((data) => {
      posts = data;

      displayPost(currentIndex);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

function displayPost(index) {
  if (index >= 0 && index < posts.length) {
    const post = posts[index];
    const featuredMedia = post._embedded["wp:featuredmedia"][0];
    const imageUrl = featuredMedia.source_url;

    const blogPost = document.createElement("div");
    blogPost.classList.add("blog_post_slider");
    blogPost.innerHTML = `
                <div>
     
                <img src="${imageUrl}" alt="${post.title.rendered}" class="blog_post_image">
                
                <h2 class="h2_for_slider">${post.title.rendered}</h2>

                
               
              
                </div>
                 
                
                
               
            `;

    createHtmlHere.innerHTML = "";
    createHtmlHere.appendChild(blogPost);
  }
}

prevBtn.addEventListener("click", (e) => {
  currentIndex = (currentIndex - 1 + posts.length) % posts.length;
  displayPost(currentIndex);
});

nextBtn.addEventListener("click", (e) => {
  currentIndex = (currentIndex + 1) % posts.length;
  displayPost(currentIndex);
});

getBlogPosts();

const createHtmlForStickyPosts = document.querySelector(".sticky_posts");

const url = "https://www.reisesakte.no//wp-json/wp/v2/posts?_embed";

async function getFeaturedPosts() {
  {
    const response = await fetch(url);

    const result = await response.json();

    for (let i = 0; i < result.length; i++)
      if (result[i].sticky === true) {
        const featuredMedia = result[i]._embedded["wp:featuredmedia"][0];
        const imageUrl = featuredMedia.media_details.sizes.medium.source_url;

        createHtmlForStickyPosts.innerHTML += `<div class="featured_blog_posts"><img class="featured_blog_images" src="${imageUrl}" alt="${result[i].title.rendered}">
                <h2 class="featured_h2">${result[i].title.rendered}</h2>
                ${result[i].excerpt.rendered} </div> `;
      }

    console.log(result);
  }
}

getFeaturedPosts();
