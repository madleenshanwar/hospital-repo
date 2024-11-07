import { axiosInstance } from "../../axiosInstance";

export const FetchRays = async () => {
  try {
    const result = await axiosInstance.get("/ray");
    if (result) {
      console.log("Fetched Rays:", result);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in fetch rays", error);
    return null;
  }
};
