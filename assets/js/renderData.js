export async function getApi(url, containerId) {
  let products = await axios
    .get(url)
    .then((res) => res.data)
    .then((data) =>
      data.products
        .map(
          (product) =>
            `<div class="divCard"><h1>${product.title}</h1>
    <div class="divImages">
    <span class="material-symbols-outlined">
    arrow_back_ios
    </span>
    <img src="${product.images[0]}" alt="${product.title}">
      <span class="material-symbols-outlined">
      arrow_forward_ios
      </span>
    </div>
      <h1>u$s ${product.price}</h1>
      <button>Add Cart</button>
    </div>`
        )
        .toString()
        .replaceAll(",", "")
    );
  //console.log(products);

  //document.getElementById(containerId).innerHTML = products;
}

export class RenderData {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  fetchData(url, cb, options = {}) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!cb) {
          console.log(data);
          return;
        }

        let products = cb(data);
        //console.log(products);
        this.#renderContainer(products);
        this.#productListener();
      });
  }
  #renderContainer(data) {
    this.container.innerHTML = data;
  }

  #productListener() {
    let productsCreate = document.querySelectorAll(".div_card");
    productsCreate.forEach((product) => {
      product.addEventListener("click", async function (event) {
        event.preventDefault();
        let id = product.getAttribute("id");
        let dataProduct = await axios
          .get(`https://dummyjson.com/products/${id}`)
          .then((res) => res.data)
          .then(
            (data) => `<div class="div_product">
            <div class="div_images_product">
            <span class="material-symbols-outlined">
            arrow_back_ios
            </span>
            <img src="${data.images[0]}" alt="${data.title}">
            <span class="material-symbols-outlined">
            arrow_forward_ios
            </span>
            </div>
            <div class="div_info">
              <h1>${data.title}</h1>
              <hr>
              <br>
              <p>${data.description}</p>
              <h1>u$s ${data.price}</h1>
              <br>
              <div>
              <button class="product_btn">Add Cart</button>
              </div>
              <br>
              </div>
              </div>
              <button class="product_btn"> Back </button>
        
        `
          );

        /* let divProduct = document.createElement("div")
        divProduct.classList.add("div_product")
        divProduct.setAttribute("id", "div_product")
        let image = document.createElement
        let main = document.getElementById("section_products") */
        main.innerHTML = dataProduct;
      });
    });
    console.log(productsCreate);
  }
}