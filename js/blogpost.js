const createHtmBlogSpecific = document.querySelector(".display_blog");
const bodyClick = document.querySelector("body");

const pageName = document.querySelector("name");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const images = document.querySelector(".blog_image");
const bigImage = document.querySelector(".overlay");

console.log(id);

const detailsUrl = `https://www.reisesakte.no//wp-json/wp/v2/posts/${id}?_embed`;

async function getProductsDetails() {
  const response = await fetch(detailsUrl);

  const result = await response.json();

  createHtmBlogSpecific.innerHTML = "";

  console.log(result);

  const single_post = document.createElement("div");
  single_post.classList.add("single_post");

  const title = document.createElement("h2");
  title.innerHTML = result.title.rendered;
  single_post.appendChild(title);

  const overlayImage = document.createElement("img");
  overlayImage.classList.add("overlay");
  overlayImage.src = result._embedded["wp:featuredmedia"]["0"].source_url;
  single_post.appendChild(overlayImage);

  const blogImage = document.createElement("img");
  blogImage.classList.add("blog_image");
  blogImage.src = result._embedded["wp:featuredmedia"]["0"].source_url;
  single_post.appendChild(blogImage);

  const content = document.createElement("div");
  content.innerHTML = result.content.rendered;
  single_post.appendChild(content);

  blogImage.addEventListener("click", function () {
    event.stopPropagation(); // Prevent the click event from propagating to the body
    overlayImage.style.display = "flex";
    console.log("Overlay clicked!");

    // Attach a click event listener to the body
    document.body.addEventListener("click", bodyClick);
  });

  const bodyClick = function () {
    overlayImage.style.display = "none";
    console.log("Body clicked!");

    // Remove the click event listener from the body
    document.body.removeEventListener("click", bodyClick);
  };

  createHtmBlogSpecific.appendChild(single_post);
}

getProductsDetails();

// createHtmBlogSpecific.addEventListener("click", function () {
// bigImage.style.display = "flex";
// getProductsDetails();
//});

//bigImage.addEventListener("click", function () {
// bigImage.style.display = "none";
// getProductsDetails();
// });

/// createHtmBlogSpecific.innerHTML = `<div class="single_post">

//  <h2> ${result.title.rendered} </h2>

//  <img class="overlay"
//  src="${result._embedded["wp:featuredmedia"]["0"].source_url}"/>

//  <img class="blog_image"
// src="${result._embedded["wp:featuredmedia"]["0"].source_url}"/>
// <p class="content"> ${result.content.rendered} </p>

//`;
