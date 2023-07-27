"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { authActions, cartActions } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const loginHandler = async (event) => {
    event.preventDefault();
    setError(null);
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    try {
      setLoading(false);
      if (isLoggedIn) {
        setLoading(true);
        return;
      }
      const { data } = await axios.post("/api/login", { username, password });
      usernameRef.current.value = "";
      passwordRef.current.value = "";

      dispatch(
        authActions.login({ token: data.token, userData: data.userData })
      );
      dispatch(cartActions.setCart(data.userData.cart));
      setLoading(true);
      router.push("/");
    } catch (err) {
      setError(err.response.data.error);
      console.log(err.response.data.error);
    }
  };

  const registerHandler = async (event) => {
    setError(null);
    event.preventDefault();
    const name = nameRef.current.value.trim();
    const imageUrl = imageRef.current.value.trim();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    try {
      setLoading(false);
      if (isLoggedIn) {
        setLoading(true);
        return;
      }
      const { data } = await axios.post("/api/register", {
        name,
        imageUrl,
        username,
        password,
      });

      nameRef.current.value = "";
      imageRef.current.value = "";
      usernameRef.current.value = "";
      passwordRef.current.value = "";

      dispatch(
        authActions.login({ token: data.token, userData: data.userData })
      );
      dispatch(cartActions.setCart(data.userData.cart));
      setLoading(true);
      router.push("/");
    } catch (err) {
      setError(err.response.data.error);
      console.log(err.response.data.error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col absolute items-center space-y-3 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 mx-auto">
      <h1 className="text-5xl">{isLogin ? "Login" : "Register"}</h1>
      <div>
        {error && <p className="text-red-600 text-center text-xl">{error}</p>}
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            className="input-primary"
            ref={nameRef}
          />
        )}
        {!isLogin && (
          <input
            type="text"
            placeholder="Image URL"
            className="input-primary"
            ref={imageRef}
          />
        )}
        <input
          type="text"
          placeholder="Username"
          className="input-primary"
          ref={usernameRef}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-primary"
          ref={passwordRef}
        />
        <div
          className="cursor-pointer underline text-center"
          onClick={() => setIsLogin((prevState) => !prevState)}
        >
          {isLogin
            ? "Don't have an account? Register here!"
            : "Already have an account? Login here!"}
        </div>
      </div>
      <button
        className="btn-primary mt-10 w-1/4"
        type="submit"
        onClick={isLogin ? loginHandler : registerHandler}
      >
        {isLogin ? "Login" : "Register"}
      </button>
    </div>
  );
};

export default LoginPage;
