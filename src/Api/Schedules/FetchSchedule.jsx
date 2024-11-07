import { axiosInstance } from "../axiosInstance";

export const FetchSchedule = async (month) => {
  try {
    const result = await axiosInstance.get(`/indexShift/${parseInt(month)}`);
    if (result) {
      console.log("Fetched Shift Schedule:", result);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in fetch shift schedule", error);
    return null;
  }
};
