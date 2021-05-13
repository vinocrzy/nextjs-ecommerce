/* /lib/auth.js */

import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const STRIPE_PK =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_42B2064C668798B5";

export const getToken = () => {
  const token = Cookie.get("token");
  return token;
};

//register a new user
export const registerUser = (username, email, password, phone) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, {
        username,
        email,
        password,
        phone,
      })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        // Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const login = (identifier, password) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        // Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const changePassword = (id, password) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  const token = Cookie.get("token");

  return new Promise((resolve, reject) => {
    axios
      .put(
        `${API_URL}/users/${id}/`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const getOrders = () => {
  if (typeof window === "undefined") {
    return;
  }

  const token = Cookie.get("token");

  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const logout = () => {
  //remove token and user cookie
  Cookie.remove("token");
  delete window.__user;
  // sync logout between multiple windows
  window.localStorage.setItem("logout", Date.now());
  //redirect to the home page
  Router.push("/");
};

//Higher Order Component to wrap our pages and logout simultaneously logged in tabs
// THIS IS NOT USED in the tutorial, only provided if you wanted to implement
export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        // Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};

export const productCheckout = (data) => {
  if (typeof window === "undefined") {
    return;
  }

  const token = Cookie.get("token");

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/orders/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const paymentConfirm = (transactionId) => {
  if (typeof window === "undefined") {
    return;
  }

  // console.log(transactionId);

  const token = Cookie.get("token");

  return new Promise((resolve, reject) => {
    axios
      .post(
        `${API_URL}/orders/confirm/`,
        { transactionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const promoCheckout = (data) => {
  if (typeof window === "undefined") {
    return;
  }

  const token = Cookie.get("token");

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/promos/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const promoConfirm = (transactionId) => {
  if (typeof window === "undefined") {
    return;
  }

  // console.log(transactionId);

  const token = Cookie.get("token");

  return new Promise((resolve, reject) => {
    axios
      .post(
        `${API_URL}/promos/confirm/`,
        { transactionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const uploadImg = (data) => {
  if (typeof window === "undefined") {
    return;
  }

  const token = Cookie.get("token");

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/upload/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const changeProfileImg = (id, ProfilePic) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  const token = Cookie.get("token");

  return new Promise((resolve, reject) => {
    axios
      .put(
        `${API_URL}/users/${id}/`,
        { ProfilePic },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};
