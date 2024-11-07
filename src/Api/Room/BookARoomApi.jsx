import { axiosInstance } from "../axiosInstance";

export const BookARoomApi = async (info, patientId, RoomId) => {
  try {
    const result = await axiosInstance.patch(
      `/bookRoom/${patientId}/${RoomId}`,
      info,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result) {
      console.log("Book A Room:", result);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in book a room", error);
    return null;
  }
};
