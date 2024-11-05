import { axiosInstance } from "../axiosInstance";

export const FetchOnePatient = async (id) => {
  try {
    const result = axiosInstance.get(`/patient/${parseInt(id)}`);
    if (result) {
      console.log("Fetched One Patient:", result);
      return result;
    } else {
      console.log("no data returned");
    }
  } catch (error) {
    console.log("Error in fetch one patient", error);
  }
};
