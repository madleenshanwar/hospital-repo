import { axiosInstance } from "../axiosInstance";

export const ChangeRoomStatus = async (status, id) => {
  try {
    const result = await axiosInstance.put(
      `/changeRoomStatus/${parseInt(id)}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result) {
      console.log("Change Room Status:", result);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in change room status", error);
    return null;
  }
};
