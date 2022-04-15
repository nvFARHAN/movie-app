let form = document.querySelector("form");
let container = document.querySelector("#container");
document.querySelector("form").addEventListener("submit", () => {
  event.preventDefault();
  container.innerHTML = null;
  let name = form.name.value;
  //   console.log(name);
  name = name.trim().split(" ").join("+");
  let year = +form.year.value;
  async function getData() {
    try {
      let movieData = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=818ec820de5649575955663bd77e57cb&query=${name}&language=en-US&page=1&include_adult=false&year=${year}`
      );
      // console.log(movieData);
      let data = await movieData.json();
      console.log(data);
      if (data.results.length != 0) {
        // console.log(data.results[0]);
        display(data.results[0]);
      } else {
        displayError();
      }
    } catch (error) {
      console.log(error);
    }
  }
  getData();
});

function display(data) {
  let box = document.createElement("div");
  let img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w400/${data.poster_path}`;
  let p = document.createElement("h2");
  p.innerText = data.original_title || data.original_name;
  let p1 = document.createElement("p");
  p1.innerHTML = `<b>Released:</b> ${data.release_date || data.first_air_date}`;
  let p2 = document.createElement("p");
  p2.innerHTML = `<b>IMDb:</b> ${data.vote_average}`;
  let tag = document.createElement("p");
  tag.setAttribute("id", "tag");
  let x = data.vote_average;
  if (x > 8.5) {
    tag.innerText = "Recommended";
    tag.style.padding = "0.5em 1em";
  }
  let p3 = document.createElement("p");
  p3.innerHTML = `<b>Plot:</b> ${data.overview}`;
  // let p4 = document.createElement("p");
  // p4.innerHTML = `<b>Cast:</b> ${data.Actors}`;
  // let p5 = document.createElement("p");
  // p5.innerHTML = `<b>Genre:</b> ${data.Genre}`;
  box.append(img, p, p1, p2, tag, p3);
  container.append(box);
}

function displayError() {
  let box = document.createElement("div");
  let img = document.createElement("img");
  img.src =
    "https://media4.giphy.com/media/JsE9qckiYyVClQ5bY2/200w.webp?cid=ecf05e47y24uvdcqhqdag0m9cq9deyqb0arjnm6an1wkntfx&rid=200w.webp&ct=g";
  box.append(img);
  container.append(box);
}
