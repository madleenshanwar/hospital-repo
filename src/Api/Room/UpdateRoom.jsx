import { axiosInstance } from "../axiosInstance";

export const UpdateRoom = async (room, id) => {
  console.log(id);
  try {
    const result = await axiosInstance.patch(`room/${parseInt(id)}`, room, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      console.log("updated rooms done", result);
      return result;
    } else {
      console.error("no departments found");
      return null;
    }
  } catch (error) {
    console.log("error in update rooms", error);
  }
};
