"use client";
import { useRouter } from "next/navigation";

const Banner = () => {
  const router = useRouter();
  return (
    <div className="w-screen px-14 md:px-0 md:w-[45%] lg:w-2/5">
      <div className="text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-wide space-y-8">
        <span className="inline-block leading-snug md:text-left text-center">
          The Fastest Food Delivery In
          <span className="text-red-600"> Your City</span>
        </span>
      </div>
      <p className="text-sm mt-10 text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed
        ultricies tortor. Donec non turpis velit. Integer aliquet placerat urna,
        id finibus lorem accumsan nec. Nam condimentum tincidunt egestas.
        Aliquam euismod condimentum nisl, sed euismod erat rhoncus et. Nullam
        fringilla risus ut.
      </p>
      <div className="flex justify-center md:justify-start">
        <button
          className="mt-5 btn-primary text-center"
          onClick={() => router.push("/menu")}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
