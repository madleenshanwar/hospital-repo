import { axiosInstance } from "../axiosInstance";

export const FetchPatients = async () => {
  try {
    const result = axiosInstance.get("/patient");
    if (result) {
      console.log("Fetched Patients:", result);
      return result;
    } else {
      console.log("no data returned");
    }
  } catch (error) {
    console.log("Error in fetch patients", error);
  }
};
