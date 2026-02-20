/* ===============================
   APP.JSX  (com zoom estilo Shopee / Mercado Livre)
   =============================== */

import { useState } from "react";
import { products } from "./data/products";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [lightbox, setLightbox] = useState({
  open: false,
  image: "",
});

  const [selectedImage, setSelectedImage] = useState(null);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  function finishOrder() {
    const message = cart
      .map((item) => `• ${item.name} - R$ ${item.price}`)
      .join("%0A");

    const url = `https://wa.me/554999664376?text=Pedido:%0A${message}%0ATotal: R$ ${total}`;
    window.open(url, "_blank");
  }

  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="header-content">
    
    <img
      src="/images/logo.png"
      alt="Logo PS Charme Sabor"
      className="logo" />
          <h1>PS Charme & Sabor</h1>
          <p>Cuias • Copos Stanley • Bombas • Chás • Gravação a Laser</p>
        </div>
      </header>

      {/* PRODUTOS */}
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

      {/* CARRINHO */}
      <div className="cart">
  <h2>Carrinho</h2>

  {cart.map((item, i) => (
    <p key={i}>
      {item.name} — R$ {item.price}
    </p>
  ))}

  <button className="finish">Finalizar no WhatsApp</button>

  {/* OBSERVAÇÃO GRAVAÇÃO */}
  <p className="laser-note">
    ⚠️ Gravações a laser devem ser combinadas pelo WhatsApp após o pedido.
  </p>
</div>

{/* ===== LIGHTBOX ===== */}
{lightbox.open && (
  <div
    className="lightbox"
    onClick={() => setLightbox({ open: false, image: "" })}
  >
    <img src={lightbox.image} alt="Zoom Produto" />
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
        <button className="arrow" onClick={prev}>
          ◀
        </button>

        {/* IMAGEM COM ZOOM */}
        <img
          src={product.images[index]}
          alt={product.name}
          onClick={() => setSelectedImage(product.images[index])}
        />

        <button className="arrow" onClick={next}>
          ▶
        </button>
      </div>

      <h3>{product.name}</h3>
      <p>R$ {product.price}</p>

      <button onClick={() => addToCart(product)}>
        Adicionar
      </button>
    </div>
  );
}

