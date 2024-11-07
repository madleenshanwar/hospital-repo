import { axiosInstance } from "../../axiosInstance";

export const UpdateTestApi = async (test, id) => {
  console.log(id);
  try {
    const result = await axiosInstance.patch(`test/${parseInt(id)}`, test, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      console.log("updated test done", result);
      return result;
    } else {
      console.error("no test found");
      return null;
    }
  } catch (error) {
    console.log("error in update test", error);
  }
};
