"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { authActions } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const cityRef = useRef(null);
  const address1Ref = useRef(null);
  const address2Ref = useRef(null);
  const postalRef = useRef(null);

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  console.log(userData);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(false);
    } else {
      router.push("/");
    }
  }, [isLoggedIn]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const city = cityRef.current.value.trim();
    const address1 = address1Ref.current.value.trim();
    const address2 = address2Ref.current.value.trim();
    const postal = +postalRef.current.value.trim();
    if (postal <= 0) {
      setError("Invalid Postcode!");
      return;
    }
    setDisabled((prevState) => !prevState);
    setError(null);
    dispatch(authActions.saveBillingInfo({ city, address1, address2, postal }));
  };
  return (
    <div className="w-1/2 m-auto mt-5">
      <h1 className="text-center text-3xl">Your Profile</h1>
      <div className="flex items-center">
        <img
          src={userData.imageUrl}
          alt="Profile Picture"
          className="w-40 h-40 rounded-full object-cover"
        />
        <div className="ml-10">
          <h1>Name: {userData.name}</h1>
          <h1>Username: name</h1>
          <h1>Total Points: 0</h1>
        </div>
      </div>

      <h1 className="mt-5 text-2xl">Billing Address</h1>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form onSubmit={submitHandler} className="mt-2">
        <label htmlFor="city">City</label>
        <input
          className={`input-primary ${disabled && "bg-gray-200"}`}
          type="text"
          placeholder="City"
          ref={cityRef}
          name="city"
          defaultValue={userData && userData.city ? userData.city : ""}
          disabled={disabled}
        />
        <label htmlFor="address1">Address 1</label>
        <input
          className={`input-primary ${disabled && "bg-gray-200"}`}
          type="text"
          placeholder="Address 1"
          ref={address1Ref}
          name="address1"
          defaultValue={userData.address1 ? userData.address1 : ""}
          disabled={disabled}
        />
        <label htmlFor="address2">Address 2</label>
        <input
          className={`input-primary ${disabled && "bg-gray-200"}`}
          type="text"
          placeholder="Address 2"
          ref={address2Ref}
          name="address2"
          defaultValue={userData.address2 ? userData.address2 : ""}
          disabled={disabled}
        />
        <label htmlFor="postal">Postal Code</label>
        <input
          className={`input-primary ${disabled && "bg-gray-200"}`}
          type="number"
          step={1}
          placeholder="Postal Code"
          ref={postalRef}
          name="postal"
          defaultValue={userData.postal ? userData.postal : ""}
          disabled={disabled}
        />
        {disabled && (
          <button
            className="btn-secondary mt-2 w-full"
            onClick={() => setDisabled((prevState) => !prevState)}
          >
            Update Billing Address
          </button>
        )}
        {!disabled && (
          <button
            className="btn-secondary mt-2 w-full"
            type="submit"
            onClick={submitHandler}
          >
            {disabled ? "Edit" : "Save"}
          </button>
        )}
      </form>
    </div>
  );
};

export default page;
