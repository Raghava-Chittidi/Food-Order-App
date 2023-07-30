import Menu from "@/components/Menu/Menu";
import { getMenu } from "@/util/serverFunctions";

const page = async () => {
  const menu = await getMenu();
  return (
    <>
      <div className="text-center text-3xl">Menu</div>
      <Menu menu={menu} />
    </>
  );
};

export default page;
