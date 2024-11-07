import { axiosInstance } from "../axiosInstance";

export const UpdatePatientApi = async (patient, id) => {
  console.log(id);
  try {
    const result = await axiosInstance.patch(
      `patient/${parseInt(id)}`,
      patient,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result) {
      console.log("updated patient done", result);
      return result;
    } else {
      console.error("no patient found");
      return null;
    }
  } catch (error) {
    console.log("error in update patient", error);
  }
};
