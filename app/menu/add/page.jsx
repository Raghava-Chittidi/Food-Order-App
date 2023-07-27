"use client";
import axios from "axios";
import React, { useRef } from "react";

const AddMenuItem = () => {
  const titleRef = useRef(null);
  const imageUrlRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const caloriesRef = useRef(null);
  const vegRef = useRef(null);
  const typeRef = useRef(null);
  const categoriesref = useRef(null);
  const addMenuItemHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const imageUrl = imageUrlRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const calories = caloriesRef.current.value;
    const veg = vegRef.current.checked;
    const type = typeRef.current.value;
    const categories = Array.from(categoriesref.current.options)
      .filter((option) => option.selected)
      .map((op) => op.value);
    axios.post("/api/menu/add", {
      title,
      imageUrl,
      description,
      price,
      calories,
      veg,
      type,
      categories,
    });
  };
  return (
    <form className="flex flex-col w-1/3 m-auto" onSubmit={addMenuItemHandler}>
      <input
        type="text"
        placeholder="Title"
        className="input-primary"
        ref={titleRef}
      />
      <input
        type="text"
        placeholder="ImageUrl"
        className="input-primary"
        ref={imageUrlRef}
      />
      <input
        type="text"
        placeholder="Description"
        className="input-primary"
        ref={descriptionRef}
      />
      <input
        type="number"
        placeholder="Price"
        className="input-primary"
        step={0.01}
        ref={priceRef}
      />
      <input
        type="number"
        placeholder="Calories"
        className="input-primary "
        ref={caloriesRef}
        step={200}
      />
      <span className="flex items-center space-x-2">
        <input type="checkbox" ref={vegRef} className="w-fit" />
        <label htmlFor="vegetarian">Vegetarian</label>
      </span>

      <select name="type" className="my-2" ref={typeRef}>
        <option value="sides">Sides</option>
        <option value="main">Main</option>
        <option value="dessert">Dessert</option>
      </select>

      <select name="categories" multiple className="my-2" ref={categoriesref}>
        <option value="chicken">Chicken</option>
        <option value="beef">Beef</option>
        <option value="fish">Fish</option>
        <option value="egg">Egg</option>
      </select>
      <button className="btn-primary mt-5" type="submit">
        AddMenuItem
      </button>
    </form>
  );
};

export default AddMenuItem;
