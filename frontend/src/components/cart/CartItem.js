import React, { useState, useEffect } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import FormatCurrency from "../Admin/formation/FormatCurrency";
import axios from "axios";

const CartItem = ({ id, quantity, company_id }) => {
  const { removeFromCart } = useShoppingCart();
  const [item, setItem] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `https://tadreexbackend.onrender.com/training-courses/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();

    // Récupération des formations achetées par l'entreprise
    axios.get(`https://tadreexbackend.onrender.com/company/${company_id}/courses`)
      .then((response) => {
        const purchasedCourses = response.data.map((course) => course.course_id);
        if (purchasedCourses.includes(id)) {
          setIsPurchased(true);
          setIsDisabled(true); // désactiver le bouton "&times;"
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, company_id]);

  const handleBuyClick = async (courseId) => {
    try {
      await axios.post(`https://tadreexbackend.onrender.com/company/${company_id}/cours/${courseId}`, {
        isPurchased: true,
        inProgress: false,
      });
      setIsPurchased(true);
      setIsDisabled(true); // désactiver le bouton "&times;"
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleRemoveClick = (courseId) => {
    if (!isDisabled && !isPurchased) { // Vérifier si le bouton "&times;" et le bouton "Acheter" sont activés
      removeFromCart(courseId);
    }
  }  

  if (item == null) return null;

  return (
    <div className="flex gap-2 items-center">
      <img
        src={`https://tadreexbackend.onrender.com/${item.image}`}
        alt="cart-img"
        style={{ width: "70px", height: "75px", objectFit: "cover" }}
      />
      <div className="flex-grow">
        <div className="text-lg">{item.title} </div>
        <div className="text-gray-400 text-sm"></div>
      </div>
      <div>{FormatCurrency(item.price * quantity)}</div>
      {!isPurchased && (
        <button
          className="text-red-500 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => handleRemoveClick(item.course_id)}
          disabled={isDisabled}
        >
          &times;
        </button>
      )}      
      <button
        onClick={() => handleBuyClick(item.course_id)}
        className="bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded"
        disabled={isPurchased}
        style={{ backgroundColor: isPurchased ? "#838996" : "" }}
      >
        {isPurchased ? "In progress" : "Demand"}
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        payer
      </button>
    </div>
  );
};

export default CartItem
