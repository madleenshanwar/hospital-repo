import { axiosInstance } from "../axiosInstance";

export const ShowDoctors = async () => {
  try {
    const result = await axiosInstance.get("/doctors");
    if (result) {
      console.log("Fetched Doctors:", result);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in fetch doctor", error);
    return null;
  }
};
