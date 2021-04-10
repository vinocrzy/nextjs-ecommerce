import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import SEO from "../seo.config";
import { AnimatePresence } from "framer-motion";
import Layout from "../layout";
import NextNprogress from "nextjs-progressbar";
import { credits } from "../helper/credits";
import App from "next/app";
import AppContext from "../context/AppContext";
import Cookie from "js-cookie";

class MyApp extends App {
  state = {
    user: null,
    cart: { items: [], total: 0 },
    darkTheme: false,
    width: undefined,
    height: undefined,
  };

  componentDidMount() {
    credits();

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    const token = Cookie.get("token");
    // restore cart from cookie, this could also be tracked in a db
    const cart = Cookie.get("cart");

    if (typeof cart === "string" && cart !== "undefined") {
      JSON.parse(cart).forEach((item) => {
        this.setState({
          cart: { items: JSON.parse(cart), total: item.price * item.quantity },
        });
      });
    }
    if (token) {
      // authenticate the token on the server and place set user object
      fetch("http://localhost:1337/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  // context functions

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  setUser = (user) => {
    this.setState({ user });
  };

  toggleTheme = () => {
    darkTheme
      ? this.setState({ darkTheme: false })
      : this.setState({ darkTheme: true });
  };

  addItem = (item) => {
    let { items } = this.state.cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    // if item is not new, add to cart, set quantity to 1
    if (!newItem) {
      //set quantity property to 1
      item.quantity = 1;
      console.log(this.state.cart.total, item.price);
      this.setState(
        {
          cart: {
            items: [...items, item],
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookie.set("cart", this.state.cart.items)
      );
    } else {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity + 1 })
                : item
            ),
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookie.set("cart", this.state.cart.items)
      );
    }
  };

  removeItem = (item) => {
    let { items } = this.state.cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    if (newItem.quantity > 1) {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity - 1 })
                : item
            ),
            total: this.state.cart.total - item.price,
          },
        },
        () => Cookie.set("cart", this.state.cart.items)
      );
    } else {
      const items = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);

      items.splice(index, 1);
      this.setState(
        { cart: { items: items, total: this.state.cart.total - item.price } },
        () => Cookie.set("cart", this.state.cart.items)
      );
    }
  };

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          cart: this.state.cart,
          darkTheme: this.state.darkTheme,
          deviceWidth: this.state.width,
          setUser: this.setUser,
          addItem: this.addItem,
          removeItem: this.removeItem,
          toggleTheme: this.toggleTheme,
        }}
      >
        <DefaultSeo {...SEO} />
        <NextNprogress
          options={{ easing: "ease", speed: 500, showSpinner: false }}
          color="linear-gradient(90deg, #5f3f91, #8c2483, #e4003f)"
        />
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout page={router.route}>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </AppContext.Provider>
    );
  }
}

export default MyApp;
