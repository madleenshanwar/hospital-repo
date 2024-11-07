import { axiosInstance } from "../axiosInstance";

export const AdmissionPatientApi = async (admission) => {
  try {
    const result = await axiosInstance.post("/admission", admission, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      console.log("Admission Patient :", result);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in admission patient", error);
    return null;
  }
};
