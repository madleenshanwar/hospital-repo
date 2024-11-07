import { axiosInstance } from "../axiosInstance";

export const FetchSurgery = async () => {
  try {
    const result = axiosInstance.get("/surgery");
    if (result) {
      console.log("Fetched Surgery:", result);
      return result;
    } else {
      console.log("no data returned");
    }
  } catch (error) {
    console.log("Error in fetch surgery", error);
  }
};
