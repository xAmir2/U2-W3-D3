const apiUrl = "https://striveschool-api.herokuapp.com/books";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
        library.innerHTML += `
<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" id="bookCard${i}">
  <div class="card h-100">
    <img src="${data[i].img}" class="card-img-top" height="350px">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${data[i].title}</h5>
      <p class="card-text">${data[i].category}<br/>€${data[i].price}</p>
      
      <div class="mt-auto d-flex justify-content-between">
        <button class="btn btn-danger" onclick="removeCard(${i})">Delete</button>
        <button class="btn btn-success" onclick='addToCart(${JSON.stringify(
          data[i],
        )})'>Buy</button>
      </div>
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

const addToCart = (book) => {
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

const renderCart = () => {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach((book, index) => {
    cartList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${book.title}
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
      </li>
    `;
  });
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

renderCart();
