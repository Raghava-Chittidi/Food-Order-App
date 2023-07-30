import BannerLeft from "@/components/Banner/BannerLeft";
import BannerRight from "@/components/Banner/BannerRight";
import { getMenu } from "@/util/serverFunctions";

const page = async () => {
  const menu = await getMenu();
  return (
    <div className="flex flex-col items-center justify-between md:flex-row px-14 overflow-x-hidden">
      <BannerLeft />
      <BannerRight menu={menu} />
    </div>
  );
};

export default page;
