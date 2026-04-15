const apiUrl = "https://striveschool-api.herokuapp.com/books";

const getBooks = () => {
  fetch(apiUrl)
    .then((response) => {
      console.log("Response", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          "Response received incorrectly from server",
          response.status,
        );
      }
    })
    .then((data) => {
      console.log("Data", data);
      const library = document.getElementById("library");
      library.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        library.innerHTML += `<div class= "col-3 mb-4" id="bookCard${i}"><div class="card">
  <img src=${data[i].img} class="card-img-top" alt="pic" height="350px">
  <div class="card-body">
    <h5 class="card-title">${data[i].title}</h5>
    <p class="card-text">${data[i].category}<br/>${data[i].price}</p>
    <a href="#" class="btn btn-primary" onclick="removeCard(${i})">Delete</a>
  </div>
</div>
</div>`;
      }
    })
    .catch((err) => {
      console.log("Error during fetching", err);
    });
};
getBooks();

const removeCard = (i) => {
  const card = document.getElementById(`bookCard${i}`);
  if (card) {
    card.remove();
  }
};
