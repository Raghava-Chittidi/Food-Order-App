import axios from "axios";

export const getMenu = async () => {
  try {
    const res = await axios.get(`${process.env.API_URL}/api/menu`);
    return res.data.menu;
  } catch (err) {
    console.log(err);
  }
};
