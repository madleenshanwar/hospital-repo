import { axiosInstance } from "../axiosInstance";

export const AvailableRoom = async (id) => {
  try {
    const result = await axiosInstance.get(`/availableRooms/${parseInt(id)}`);
    if (result) {
      console.log("Fetched Available Room:", result.data.data.rooms);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in fetch available room", error);
    return null;
  }
};
