import Checkout from "@/components/Checkout/Checkout";
import { getMenu } from "@/util/serverFunctions";

const CheckoutPage = async () => {
  const menu = await getMenu();
  return <Checkout menu={menu} />;
};

export default CheckoutPage;
