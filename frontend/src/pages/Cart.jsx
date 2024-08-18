import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { NavLink } from "react-router-dom";
import { clear } from "../redux/Slices/cartSlice";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [amount, setAmount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponStatus, setCouponStatus] = useState({
    OFF10: false,
    OFF30: false,
    OFF50: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const payment = () => {
    toast.success("Please Wait", {
      duration: 2000,
    });
    setTimeout(() => {
      toast.success("Payment Successfully Done", {
        duration: 2000,
      });
    }, 2000);
    setTimeout(() => {
      toast("Thanks for Shopping!! Visit Again", {
        icon: "✨",
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }, 4000);

    setTimeout(() => {
      dispatch(clear());
      navigate("/thankyou");
    }, 2000);
  };

  useEffect(() => {
    if (cart.length > 0) {
      const totalAmount = cart.reduce((acc, curr) => {
        const price = parseFloat(curr.price) || 0;
        const quantity = parseInt(curr.quantity, 10) || 1;
        return acc + price * quantity;
      }, 0);

      const finalAmount = Math.max(totalAmount - discount, 0);
      setAmount(finalAmount);
      setCouponStatus({
        OFF10: true,
        OFF30: totalAmount >= 300,
        OFF50: totalAmount >= 500,
      });
    } else {
      setAmount(0);
    }
  }, [cart, discount]);

  const applyCoupon = () => {
    const totalAmount = cart.reduce((acc, curr) => {
      const price = parseFloat(curr.price) || 0;
      const quantity = parseInt(curr.quantity, 10) || 1;
      return acc + price * quantity;
    }, 0);

    const coupon = couponCode.trim();
    let discountAmount = 0;
    let validCoupon = false;
    switch (coupon) {
      case "OFF10":
        if (totalAmount > 0) {
          discountAmount = totalAmount * 0.1;
          validCoupon = true;
          if (totalAmount <= 300) {
            toast(
              "You could save even more with OFF30! (Orders of $300 or more)",
              {
                duration: 4000,
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              }
            );
          }
        }
        break;
      case "OFF30":
        if (totalAmount >= 300) {
          discountAmount = totalAmount * 0.3;
          validCoupon = true;
          if (totalAmount <= 500) {
            toast(
              "You could save even more with OFF50! (Orders of $500 or more)",
              {
                duration: 4000,
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              }
            );
          }
        }
        break;
      case "OFF50":
        if (totalAmount >= 500) {
          discountAmount = totalAmount * 0.5;
          validCoupon = true;
        }
        break;
      default:
        validCoupon = false;
        break;
    }

    if (validCoupon) {
      setDiscount(discountAmount);
      setAppliedCoupon(coupon);
      toast.success(
        `Coupon applied successfully! 
        ${coupon.replace("OFF", "")}% off 
        ($${discountAmount.toFixed(2)})`
      );
    } else {
      setDiscount(0);
      setAppliedCoupon(null);
      toast.error("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  return (
    <div>
      <Navbar />
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1479920252409-6e3d8e8d4866?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
        }}
      >
        <div className="mb-0 px-4 sm:px-6 lg:px-8">
          {cart.length > 0 ? (
            <div className="flex flex-col lg:flex-row lg:justify-center max-w-7xl mx-auto gap-x-5">
              <div className="lg:w-[60%] flex flex-col p-2">
                {cart.map((cartItem, index) => (
                  <CartItem
                    item={cartItem}
                    key={cartItem.id}
                    itemIndex={index}
                  />
                ))}
              </div>

              <div className="lg:w-[40%] mt-5 flex flex-col">
                <div className="flex flex-col h-[100%] justify-between p-5 gap-5 my-14">
                  <div className="flex flex-col gap-5">
                    <div className="font-semibold text-xl text-purple-800">
                      Your Cart
                    </div>
                    <div className="font-semibold text-5xl text-purple-700 -mt-5">
                      Summary
                    </div>
                    <p className="text-xl">
                      <span className="text-gray-700 font-semibold text-xl">
                        Total Items: {cart.length}
                      </span>
                    </p>
                  </div>
                  {/* </div> */}
                  <div className="flex flex-col gap-5">
                    <div className="text-xl font-bold">
                      <span className="text-gray-700 font-semibold">
                        Total Amount:
                      </span>{" "}
                      ${amount > 0 ? amount.toFixed(2) : "0.00"}
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-md text-lg text-gray-800 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-purple-600">
                          Coupon Code:
                        </span>
                        <span
                          className={`font-bold ${
                            appliedCoupon ? "text-purple-600" : "text-gray-500"
                          }`}
                        >
                          {appliedCoupon || "Not Applied"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">
                          Discount:
                        </span>
                        <span className="font-bold text-purple-600">
                          ${discount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">
                          Amount Payable:
                        </span>
                        <span className="font-bold text-purple-600">
                          ${amount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-md text-lg text-gray-800 flex flex-wrap gap-2 items-center justify-between">
                      <span className="font-bold text-purple-600">
                        Coupon Codes:
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        <span
                          onClick={() => setCouponCode("OFF10")}
                          className={`font-bold ${
                            couponStatus.OFF10
                              ? "text-red-600"
                              : "text-gray-500 line-through"
                          } bg-yellow-300 px-3 animate-pulse py-1 rounded-lg shadow-md cursor-pointer`}
                        >
                          OFF10
                        </span>
                        <span
                          onClick={() => setCouponCode("OFF30")}
                          className={`font-bold ${
                            couponStatus.OFF30
                              ? "text-red-600"
                              : "text-gray-500 line-through"
                          } bg-yellow-300 px-3 py-1 animate-pulse rounded-lg shadow-md cursor-pointer`}
                        >
                          OFF30
                        </span>
                        <span
                          onClick={() => setCouponCode("OFF50")}
                          className={`font-bold ${
                            couponStatus.OFF50
                              ? "text-red-600"
                              : "text-gray-500 line-through"
                          } bg-yellow-300 px-3 py-1 animate-pulse rounded-lg shadow-md cursor-pointer`}
                        >
                          OFF50
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Applicable for total amount of:</p>
                        <ul className="list-disc pl-5">
                          <li>Use "OFF10" for 10% off for all orders</li>
                          <li>
                            Use "OFF30" 30% off for orders of $300 and above
                          </li>
                          <li>
                            Use "OFF50" 50% off for orders of $500 and above
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-md mb-3 sm:mb-0"
                      />
                      {!appliedCoupon ? (
                        <button
                          onClick={applyCoupon}
                          className="bg-purple-500 hover:bg-purple-700 rounded py-2 px-2 border-2 text-white transition duration-300 ease-linear border-purple-600 font-bold"
                        >
                          Apply Coupon
                        </button>
                      ) : (
                        <button
                          onClick={removeCoupon}
                          className="bg-red-600 hover:bg-red-800 rounded py-2 px-2 border-2 text-white transition duration-300 ease-linear border-red-700 font-bold"
                        >
                          Remove Coupon
                        </button>
                      )}
                    </div>

                    <button
                      onClick={payment}
                      className="bg-purple-700 hover:bg-purple-900 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold p-3 text-xl"
                    >
                      CheckOut Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-[80vh] flex flex-col justify-center items-center">
              <h1 className="text-gray-700 font-semibold text-xl mb-2">
                Your cart is empty!
              </h1>
              <NavLink to="/home">
                <button className="uppercase bg-purple-600 p-3 px-10 rounded-lg text-white mt-6 font-semibold tracking-wider hover:bg-purple-700 duration-300 transition-all ease-in">
                  Shop Now
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
