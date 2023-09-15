const url = "https://www.reisesakte.no//wp-json/wp/v2/posts?_embed&per_page=20";

const createHtmlHere = document.querySelector(".all_posts");
const morePostsButton = document.querySelector(".more_posts");
const loader = document.querySelector(".loader");
const hideContent = document.querySelectorAll(".more-link");

let currentPage = 1;
const postsPerPage = 10;

async function getBlogPosts() {
  const response = await fetch(url);

  const result = await response.json();

  loader.classList.remove("loader");

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  for (let i = startIndex; i < endIndex && i < result.length; i++) {
    const post = result[i];
    const title = post.title.rendered;
    const excerpt = post.excerpt.rendered;
    const image = post._embedded["wp:featuredmedia"]["0"].source_url;
    const postHTML = `<div class="single_post">
 
      <h2> ${title} </h2>
      <img class="blog_image"
      src="${image}" alt="${title}>
      <p class="exerpt"> ${excerpt} </p>
      <a href="blogpost.html?id=${result[i].id}" >
      <button class="les_mer" aria-label="Les hele innlegget" role="button"> 
      Les videre
      </button>
      </a>
 </div>`;

    createHtmlHere.insertAdjacentHTML("beforeend", postHTML);
  }

  if (endIndex < result.length) {
    morePostsButton.style.display = "block";
  } else {
    morePostsButton.style.display = "none";
  }
}

hideContent.forEach((element) => {
  element.setAttribute("aria-hidden", "true");
});

getBlogPosts();

morePostsButton.addEventListener("click", () => {
  currentPage++;
  getBlogPosts();
});
