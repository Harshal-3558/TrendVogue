import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Nunito } from "next/font/google";
import { React, useContext, useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
const nunito = Nunito({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0); //Top loading bar
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40); // Above function is used to update progress when routing is completed
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100); // Above function is used to update progress when routing is completed
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (err) {
      console.error(err);
      localStorage.clear();
    }
    //Login and SignUp data
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random()); //used to re-render the component
    }
  }, [router.query]); //since useEffect will not run due to router.push hence used router.query

  //Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random()); //used to re-render the component
  };

  // Add to Cart
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

  //Save to cart
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subTotal = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subTotal += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setTotal(subTotal);
  };

  //clear cart
  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  //Remove from cart
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

  //Buy Now
  const buyNow = (itemCode, desc, qty, color, size, price, img) => {
    let newCart = { itemCode: { qty: 1, price, desc, size, color, img } };
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
          buyNow={buyNow}
        />
        <Component
          user={user}
          cart={cart}
          total={total}
          addCart={addCart}
          clearCart={clearCart}
          removeFromCart={removeFromCart}
          buyNow={buyNow}
          {...pageProps}
        />
        <Footer />
      </main>
    </>
  );
}
