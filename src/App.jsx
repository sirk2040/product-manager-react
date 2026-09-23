import "./App.css";
import { useState } from "react";
function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 1000, category: "Electronics" },
    { id: 2, name: "Phone", price: 500, category: "Electronics" },
    { id: 3, name: "Mouse", price: 50, category: "Accessories" },
    { id: 4, name: "Monitor", price: 300, category: "Electronics" },
  ]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productUpdate, setProductUpdate] = useState("");
  //Adding item (Form → state → validation → array → setProducts)
  const handleChange = () => {
    // validation of product Update
    if (productUpdate === "") {
      if (productName.trim() === "" || productCategory.trim() === "") {
        alert("Empty field → product NOT added.");
      } else if (productPrice <= 0) {
        alert("Put valid price!!!");
      } else {
        //getting unique id
        const newId =
          products
            .map((product) => product.id)
            .reduce((topId, id) => {
              if (id > topId) {
                return id;
              } else {
                return topId;
              }
            }, 0) + 1;
        console.log("newId: ", newId);

        setProducts([
          ...products,
          {
            id: newId,
            name: productName,
            price: productPrice,
            category: productCategory,
          },
        ]);
        console.log("Item added");
        setProductName("");
        setProductPrice("");
        setProductCategory("");
        console.log("placeholder emptied");
      }
    } else {
      const updatedProducts = products.map((product) => {
        if (product.id === productUpdate) {
          return {
            ...product,
            name: productName,
            price: productPrice,
            category: productCategory,
          };
        } else {
          return product;
        }
      });
      //validation of updating products
      if (productName.trim() === "" || productCategory.trim() === "") {
        alert("Empty field");
      } else if (productPrice <= 0) {
        alert("Invalid price");
      } else {
        setProducts(updatedProducts);
        setProductName("");
        setProductPrice("");
        setProductCategory("");
        setProductUpdate("");
      }
    }
  };
  //removing item (Button → id → filter → setProducts)
  const handleChangeRemove = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    console.log("Item is removed.");
  };

  //Product update or edit (Form → validation → map → spread → setProducts)
  const handleChangeEdit = (id) => {
    setProductUpdate(id);
    const selectedProduct = products.find((product) => product.id === id);
    console.log(selectedProduct);

    setProductName(selectedProduct.name);
    setProductPrice(selectedProduct.price);
    setProductCategory(selectedProduct.category);
  };

  return (
    <div>
      <h1>Product Manager</h1>
      <h2>Manage Products</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault(); // prevents page reload
          console.log("Add Button is clicked");
          handleChange();
        }}
      >
        <label htmlFor="Product-Name">Product Name</label>
        <input // while putting input all following are must..i.e. id,type,placeholder,onChange,value
          id="Product-Name"
          type="text"
          placeholder="Product Name"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          value={productName}
        />
        <label htmlFor="Product-Price">Product Price</label>
        <input
          id="Product-Price"
          type="number"
          placeholder="Product Price"
          onChange={(e) => {
            setProductPrice(Number(e.target.value)); // + unary to change string to number
          }}
          value={productPrice}
        />
        <label htmlFor="Product-Category">Product Category</label>
        <input
          id="Product-Category"
          type="text"
          placeholder="Product Category"
          onChange={(e) => {
            setProductCategory(e.target.value);
          }}
          value={productCategory}
        />
        <button type="submit">
          {productUpdate === "" ? "Add Product" : "Update Product"}
        </button>
      </form>

      {products.map((product) => {
        return (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <button
              onClick={() => {
                console.log("Remove Button clicked.");
                handleChangeRemove(product.id);
              }}
            >
              Remove
            </button>
            <button
              onClick={() => {
                handleChangeEdit(product.id);
                console.log("Edit button clicked");
              }}
            >
              Edit
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default App;
