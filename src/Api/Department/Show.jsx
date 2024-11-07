import { axiosInstance } from "../axiosInstance";

export const ShowDepartments = async () => {
  try {
    const result = await axiosInstance.get("/departments");
    if (result) {
      console.log("Fetched Department:", result);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in fetch department", error);
    return null;
  }
};
