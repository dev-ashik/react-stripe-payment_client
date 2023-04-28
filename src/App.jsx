import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [product, setProduct] = useState({
    name: "Headphone",
    price: 10,
  });

  const priceForStripe = product.price * 100;

  const handlePayNow = async (token) => {
    console.log(token);
    try {
      const response = await axios({
        url: "http://localhost:8000/payment",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });

      if (response.status === 200) {
        toast.success("Payment successful");
        console.log("Your payment is successful");
      } else {
        toast.error("Payment is not successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Complete React & Stripe payment integration</h2>
      <p>
        <span>Product: </span>
        {product.name}
      </p>
      <p>
        <span>Price: </span>
        {product.price}
      </p>

      <StripeCheckout
        stripeKey="pk_test_51KOcnlE6mLAE4h3PUxtfXb1ZSl4sQiPAd0AFk0dWetSkd0eSfTfSKHsd8eupNzwhnK4ekgz5SP6xilxSj5de4Zdq00eRzUaBDp"
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        // shippingAddress
        amount={{ priceForStripe }}
        description={`Your total is ${product.price}`}
        token={handlePayNow}
      />

      <ToastContainer />
    </div>
  );
}

export default App;
