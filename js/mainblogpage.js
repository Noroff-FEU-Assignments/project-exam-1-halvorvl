const url = "https://www.reisesakte.no//wp-json/wp/v2/posts?_embed";

const createHtmlHere = document.querySelector(".all_posts");

async function getBlogPosts() {
  const response = await fetch(url);

  const result = await response.json();

  console.log(result);

  for (let i = 0; i < result.length; i++) {
    createHtmlHere.innerHTML += `<div class="single_post">

     <h2> ${result[i].title.rendered} </h2>
      <img class="blog_image"
            src="${result[i]._embedded["wp:featuredmedia"]["0"].source_url}"/>

             <p class="exerpt"> ${result[i].excerpt.rendered} </p>

            

      

   
 </div>`;
  }
}

getBlogPosts();
