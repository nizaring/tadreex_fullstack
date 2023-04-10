import React from "react";
import { XIcon } from "@heroicons/react/outline";
import CartItem from "./CartItem";
import FormatCurrency from "../Admin/formation/FormatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

const ShoppingCart = ({ isOpen }) => {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={closeCart} // add onClick event to close the cart
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between px-4 py-3 bg-gray-200">
                <h2 className="text-lg font-medium">Cart</h2>
                <button
                  type="button"
                  onClick={closeCart}
                  className="text-gray-600 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                >
                  <span className="sr-only">Close panel</span>
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 py-4 overflow-y-auto px-4 space-y-3">
                {cartItems.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>
              <div className="px-4 py-3 bg-gray-200 font-bold text-lg flex justify-between items-center">
                <span>Total</span>
                <span>
                  {FormatCurrency(
                    cartItems.reduce((total, cartItem) => {
                      return total + (cartItem.price || 0) * cartItem.quantity;
                    }, 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShoppingCart;
