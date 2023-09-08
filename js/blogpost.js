const createHtmBlogSpecific = document.querySelector(".display_blog");

const pageName = document.querySelector("name");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const detailsUrl = `https://www.reisesakte.no//wp-json/wp/v2/posts/${id}?_embed`;

async function getProductsDetails() {
  const response = await fetch(detailsUrl);

  const result = await response.json();

  createHtmBlogSpecific.innerHTML = "";

  console.log(result);

  const content = result.content.rendered;

  console.log(result.content.rendered);

  createHtmBlogSpecific.innerHTML = `<div class="single_post">

      <h2> ${result.title.rendered} </h2>
      <img class="blog_image"
      src="${result._embedded["wp:featuredmedia"]["0"].source_url}"/>
      <p class="content"> ${result.content.rendered} </p>
       
      
`;
}

getProductsDetails();
