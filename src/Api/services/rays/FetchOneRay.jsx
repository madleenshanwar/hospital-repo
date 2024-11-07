import { axiosInstance } from "../../axiosInstance";

export const FetchOneRay = async (id) => {
  try {
    const result = await axiosInstance.get(`/ray/${parseInt(id)}`);
    if (result) {
      console.log("Fetched One Ray:", result);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in fetch one ray", error);
    return null;
  }
};
