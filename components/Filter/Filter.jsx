"use client";
import { useEffect, useState } from "react";

const Filter = ({ applyFilter }) => {
  const startingState = {
    vegetarian: false,
    type: null,
    categories: [],
    calories: 3000,
  };
  const [filter, setFilter] = useState(startingState);
  const [calories, setCalories] = useState(3000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter((prevState) => {
        return { ...prevState, calories };
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [calories]);

  return (
    <div className="border-gray-200 border-2 md:w-64 xl:w-80 mt-10 px-5 py-2 h-fit text-base md:text-xl space-y-5 md:sticky md:top-[7.5rem]">
      <div className="mt-3">
        <h1>Sort By</h1>
        <div className="space-x-3 mt-5 text-base">
          <button
            className={`filter-btn ${
              filter.vegetarian ? "bg-blue-100" : "hover:text-blue-500"
            }`}
            onClick={() => {
              setFilter((prevState) => {
                return { ...prevState, vegetarian: !prevState.vegetarian };
              });
            }}
          >
            Vegetarian
          </button>
        </div>
      </div>
      <hr />
      <div>
        <h1>Type</h1>
        <div className="mt-5 text-base flex space-x-1 xl:space-x-3">
          {["Sides", "Main", "Dessert"].map((choice, index) => (
            <button
              key={index}
              className={`filter-btn ${
                filter.type === choice ? "bg-blue-100" : "hover:text-blue-500"
              }`}
              onClick={() => {
                setFilter((prevState) => {
                  const value =
                    prevState.type === null || prevState.type !== choice
                      ? choice
                      : null;
                  return { ...prevState, type: value };
                });
              }}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
      <hr />
      <div>
        <div className="mb-5">Categories</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:block md:space-x-0">
          {["Chicken", "Beef", "Fish", "Egg"].map((category, index) => (
            <div
              className="flex items-center space-x-2 text-base md:text-lg w-fit"
              key={index}
            >
              <input
                checked={filter.categories.includes(category)}
                type="checkbox"
                className="h-5 w-5"
                id={category}
                onChange={(event) => {
                  setFilter((prevState) => {
                    if (event.target.checked) {
                      return {
                        ...prevState,
                        categories: [...prevState.categories, event.target.id],
                      };
                    } else {
                      return {
                        ...prevState,
                        categories: prevState.categories.filter(
                          (category) => category != event.target.id
                        ),
                      };
                    }
                  });
                }}
              />
              <label>{category}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div>
        <div className="flex justify-between">
          <span>Calories</span>
          <span className="text-base md:text-lg">{calories}kcal</span>
        </div>
        <input
          type="range"
          max={3000}
          min={0}
          step={200}
          value={calories}
          className="w-full"
          onChange={(event) => {
            setCalories(+event.target.value);
          }}
        />
      </div>
      <div className="flex justify-between">
        <button
          className="btn-secondary"
          onClick={applyFilter.bind(null, filter)}
        >
          Apply Filter
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            setFilter(startingState);
            setCalories(3000);
            applyFilter(startingState);
          }}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
