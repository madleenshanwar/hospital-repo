import { axiosInstance } from "../../axiosInstance";

export const UpdatePatientTest = async (test, id) => {
  try {
    const result = await axiosInstance.patch(
      `/patientTest/${parseInt(id)}`,
      test,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result) {
      console.log("Update Patient Test Done", result.data.data);
      return result;
    } else {
      console.error("no test found");
      return null;
    }
  } catch (error) {
    console.log("error in update patient test", error);
  }
};
