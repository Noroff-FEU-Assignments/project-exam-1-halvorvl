const url = "https://www.reisesakte.no//wp-json/wp/v2/posts?_embed&per_page=20";

const createHtmlHere = document.querySelector(".all_posts");
const morePostsButton = document.querySelector(".more_posts");
const loader = document.querySelector(".loader");

console.log(loader);

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
 <a href="blogpost.html?id=${result[i].id}" >
      <h2> ${title} </h2>
      <img class="blog_image"
      src="${image}"/>
      <p class="exerpt"> ${excerpt} </p>
       
      </a>
 </div>`;

    createHtmlHere.insertAdjacentHTML("beforeend", postHTML);
    console.log(result);
  }

  if (endIndex < result.length) {
    morePostsButton.style.display = "block";
  } else {
    morePostsButton.style.display = "none";
  }
}

getBlogPosts();

morePostsButton.addEventListener("click", () => {
  currentPage++;
  getBlogPosts();
});
