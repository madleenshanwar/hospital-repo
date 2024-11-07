import { axiosInstance } from "../axiosInstance";

export const AddPatientApi = async (patient) => {
  try {
    const result = await axiosInstance.post("/patient", patient, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      console.log("Add Patient:", result);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in add patient", error);
    return null;
  }
};
