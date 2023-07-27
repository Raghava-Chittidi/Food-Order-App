"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai/index.esm";
import { useSelector } from "react-redux";
import { RiAsterisk } from "react-icons/ri/index.esm";

const Address = ({ setSummary, billingInfo, setBillingInfo }) => {
  const cityRef = useRef(null);
  const address1Ref = useRef(null);
  const address2Ref = useRef(null);
  const postalRef = useRef(null);
  const instructionsRef = useRef(null);
  const router = useRouter();
  const userData = useSelector((state) => state.auth.userData);

  const submitHandler = (event) => {
    event.preventDefault();
    const city = cityRef.current.value.trim();
    const address1 = address1Ref.current.value.trim();
    const address2 = address2Ref.current.value.trim();
    const postal = postalRef.current.value.trim();
    const newInstructions = instructionsRef.current.value.trim();
    setBillingInfo({
      city,
      address1,
      address2,
      postal: +postal,
      instructions: newInstructions,
    });
    setSummary(true);
  };
  return (
    <div className="rounded-lg p-5 border-2 border-black">
      <h1 className="text-2xl text-center">Deliver to</h1>
      <form onSubmit={submitHandler}>
        <div className="flex space-x-1">
          <label htmlFor="city">City</label>
          <RiAsterisk fill={"red"} size={12} />
        </div>
        <input
          className="input-primary"
          type="text"
          placeholder="City"
          ref={cityRef}
          name="city"
          defaultValue={
            billingInfo.city ? billingInfo.city : userData && userData.city
          }
          required={true}
        />
        <div className="flex space-x-1">
          <label htmlFor="address1">Address 1</label>
          <RiAsterisk fill={"red"} size={12} />
        </div>
        <input
          className="input-primary"
          type="text"
          placeholder="Address 1"
          ref={address1Ref}
          name="address1"
          defaultValue={
            billingInfo.address1
              ? billingInfo.address1
              : userData && userData.address1
          }
          required={true}
        />
        <div className="flex space-x-1">
          <label htmlFor="address2">Address 2</label>
          <RiAsterisk fill={"red"} size={12} />
        </div>
        <input
          className="input-primary"
          type="text"
          placeholder="Address 2"
          ref={address2Ref}
          name="address2"
          defaultValue={
            billingInfo.address2
              ? billingInfo.address2
              : userData && userData.address2
          }
          required={true}
        />
        <div className="flex space-x-1">
          <label htmlFor="postal">Postal Code</label>
          <RiAsterisk fill={"red"} size={12} />
        </div>
        <input
          className="input-primary"
          type="number"
          placeholder="Postal Code"
          ref={postalRef}
          name="postal"
          defaultValue={
            billingInfo.postal
              ? billingInfo.postal
              : userData && userData.postal
          }
          required={true}
        />
        <textarea
          className="input-primary resize-none placeholder:text-sm md:placeholder:text-base text-sm md:text-base"
          placeholder="Instructions to driver (Optional)"
          rows={5}
          ref={instructionsRef}
          defaultValue={billingInfo.instructions}
        />
        <div className="flex justify-between">
          <button
            className="btn-secondary"
            onClick={() => router.push("/cart")}
          >
            Back
          </button>
          <button
            className="btn-primary flex items-center space-x-2"
            type="submit"
          >
            <span>Next</span>
            <AiOutlineArrowRight size={15} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Address;
