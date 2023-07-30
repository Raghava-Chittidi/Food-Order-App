import Cart from "@/components/Cart/Cart";
import { getMenu } from "@/util/serverFunctions";

const page = async () => {
  const menu = await getMenu();
  return (
    <>
      <div className="text-center text-3xl">Cart</div>
      <Cart menu={menu} />
    </>
  );
};

export default page;
