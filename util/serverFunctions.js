import axios from "axios";

export const getMenu = async () => {
  const res = await axios.get(`${process.env.API_URL}/api/menu`);
  return res.data.menu;
};
