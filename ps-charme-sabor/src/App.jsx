import { useState } from "react";
import { products } from "./data/products";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(index) {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  }

  function finishOrder() {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const message = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}\n   💰 Faixa de valor: R$ ${item.price}`
      )
      .join("\n\n");

    const fullMessage = `🛒 *NOVO PEDIDO - PS Charme & Sabor*

${message}

📌 Observação:
Valores variam conforme modelo e personalização.
Confirmar detalhes pelo WhatsApp.`;

    const encodedMessage = encodeURIComponent(fullMessage);
    const url = `https://wa.me/554999664376?text=${encodedMessage}`;
    window.open(url, "_blank");
  }

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <img
            src="/images/logo.png"
            alt="Logo PS Charme Sabor"
            className="logo"
          />
          <h1>PS Charme & Sabor</h1>
          <p>Cuias • Copos Stanley • Bombas • Chás • Gravação a Laser</p>
        </div>
      </header>

      <div className="products">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            setSelectedImage={setSelectedImage}
          />
        ))}
      </div>

      <div className="cart">
        <h2>Carrinho</h2>

        {cart.map((item, i) => (
          <div key={i} className="cart-item">
            <div>
              <strong>{item.name}</strong>
              <p>💰 R$ {item.price}</p>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(i)}
            >
              ❌
            </button>
          </div>
        ))}

        <button className="finish" onClick={finishOrder}>
          Finalizar no WhatsApp
        </button>

        <p className="laser-note">
          ⚠️ Gravações a laser devem ser combinadas pelo WhatsApp após o pedido.
        </p>
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Zoom Produto" />
        </div>
      )}
    </div>
  );
}

/* ===============================
   CARD PRODUTO
   =============================== */

function ProductCard({ product, addToCart, setSelectedImage }) {
  const [index, setIndex] = useState(0);

  function next() {
    setIndex((prev) => (prev + 1) % product.images.length);
  }

  function prev() {
    setIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  }

  return (
    <div className="card">
      <div className="carousel">
        <button className="arrow" onClick={prev}>◀</button>

        <img
          src={product.images[index]}
          alt={product.name}
          onClick={() => setSelectedImage(product.images[index])}
        />

        <button className="arrow" onClick={next}>▶</button>
      </div>

      <h3>{product.name}</h3>
      <p>R$ {product.price}</p>

      <button onClick={() => addToCart(product)}>
        Adicionar
      </button>
    </div>
  );
}