export const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});

export const camelToNormal = (text) => {
  if (text) {
    var result = text.replace(/([A-Z])/g, " $1");
    var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const checkOutDataFormater = (data, cart) => {
  if (data && cart) {
    const cartItems = [];

    cart.items.map((items) => {
      var tempItem = {
        id: items.id,
        name: items.name,
        price: items.price,
        slug: items.slug,
        quantity: items.quantity,
      };
      cartItems.push(tempItem);
    });

    var dataTemplate = {
      cartItems: cartItems,
      address: {
        city: data.City,
        country: data.country,
        line1: data.Address,
        postal_code: data.PINcode,
        state: data.region,
      },
      name: `${data.FirstName} ${data.LastName}`,
      email: data.Email,
      phone: data.Phone,
    };

    return dataTemplate;
  } else {
    return null;
  }
};
