import { axiosInstance } from "../axiosInstance";

export const FetchOneSurgery = async (id) => {
  try {
    const result = axiosInstance.get(`/surgery/${parseInt(id)}`);
    if (result) {
      console.log("Fetched One Surgery:", result);
      return result;
    } else {
      console.log("no data returned");
    }
  } catch (error) {
    console.log("Error in fetch one surgery", error);
  }
};
