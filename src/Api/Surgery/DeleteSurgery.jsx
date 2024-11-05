import { axiosInstance } from "../axiosInstance";

export const DeleteSurgery= async (id) => {
  try {
    const result = axiosInstance.delete(`/surgery/${parseInt(id)}`);
    if (result) {
      console.log("Delete Surgery Done:", result);
      return result;
    } else {
      console.error("no data returned");
      return null; 
    }
  } catch (error) {
    console.log("Error in delete surgery", error);
  }
};
