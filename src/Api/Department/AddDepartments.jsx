import { axiosInstance } from "../axiosInstance";

export const AddDepartments = async (department) => {
  try {
    const result = await axiosInstance.post("/departments", department, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      console.log("Add Department:", result);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in add depatment", error);
    return null;
  }
};
