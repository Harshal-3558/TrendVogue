import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Nunito } from "next/font/google";
import { React, useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
const nunito = Nunito({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({}); // State for shopping cart
  const [itemDB, setItemDB] = useState({}); // State for shopping cart fetching from DB
  const [total, setTotal] = useState(0); // State for total price
  const [user, setUser] = useState(""); // State for user data
  const [key, setKey] = useState(0); // State for re-rendering component
  const [progress, setProgress] = useState(0); // State for top loading bar
  const router = useRouter();

  useEffect(() => {
    // Update progress when routing starts
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });

    // Update progress when routing completes
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    try {
      // Initialize cart from local storage if available
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (err) {
      localStorage.clear();
    }

    // Get user data from local storage
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
    setKey(Math.random());
    // eslint-disable-next-line
  }, [router.query]);

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setUser("");
    setKey(Math.random());
  };

  // Add item to cart
  const addCart = (itemCode, desc, qty, color, size, price, img) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + 1;
    } else {
      newCart[itemCode] = { qty: 1, price, desc, size, color, img };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  // Save cart to local storage and update total price
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subTotal = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subTotal += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setTotal(subTotal);
  };

  // get cart from database and update total price
  const saveDataCart = (myCart) => {
    let subTotal = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subTotal += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setTotal(subTotal);
  };

  // Clear cart
  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  // Remove item from cart
  const removeFromCart = (itemCode, desc, qty, color, size, price) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode]["qty"] = newCart[itemCode].qty - 1;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  //Delete item from cart
  const deleteFromCart = (itemCode) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    // Check if the item exists in the cart
    if (itemCode in cart) {
      delete cart[itemCode];
      localStorage.setItem("cart", JSON.stringify(cart));
      setCart(cart);
      saveCart(cart);
    }
  };

  // Buy item now
  const buyNow = (itemCode, desc, qty, color, size, price, img) => {
    let newCart = cart;
    newCart[itemCode] = { qty: 1, price, desc, size, color, img };
    setCart(newCart);
    saveCart(newCart);
    router.push("/orders");
  };
  return (
    <>
      <main className={nunito.className}>
        {/* Loding Bar */}
        <LoadingBar
          color="#f11946"
          height={3}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar
          logout={logout}
          user={user}
          key={key}
          cart={cart}
          total={total}
          addCart={addCart}
          clearCart={clearCart}
          removeFromCart={removeFromCart}
          itemDB={itemDB}
          buyNow={buyNow}
        />
        <Component
          saveDataCart={saveDataCart}
          user={user}
          cart={cart}
          total={total}
          addCart={addCart}
          clearCart={clearCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
          setItemDB={setItemDB}
          itemDB={itemDB}
          buyNow={buyNow}
          {...pageProps}
        />
        <Footer />
      </main>
    </>
  );
}
