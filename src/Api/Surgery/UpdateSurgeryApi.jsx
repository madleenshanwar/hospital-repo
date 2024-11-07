import { axiosInstance } from "../axiosInstance";

export const UpdateSurgeryApi = async (surgery, id) => {
  console.log(id);
  try {
    const result = await axiosInstance.patch(
      `surgery/${parseInt(id)}`,
      surgery,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result) {
      console.log("updated surgery done", result);
      return result;
    } else {
      console.error("no surgery found");
      return null;
    }
  } catch (error) {
    console.log("error in update surgery", error);
  }
};
