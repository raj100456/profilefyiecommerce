import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { remove, updateQuantity } from "../redux/Slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed From Cart");
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart();
    } else {
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="flex flex-col p-5 justify-between mt-2 mb-2 mx-5 border-b-[3px] border-slate-500">
      <div className="flex flex-row p-3 gap-5 items-center">
        <div className="w-[30%]">
          <img alt="" src={item.image} className="object-cover" />
        </div>
        <div className="w-[70%] self-start space-y-5 ml-5">
          <h1 className="text-xl text-slate-700 font-semibold">{item.title}</h1>
          <p className="text-base text-slate-700 font-medium">
            {item.description}
          </p>
          <p className="text-green-600 font-bold text-lg">${item.price}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md"
              >
                -
              </button>
              <p className="text-lg font-medium">{quantity}</p>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md"
              >
                +
              </button>
            </div>

            <button
              className="text-red-800 bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
              onClick={removeFromCart}
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
