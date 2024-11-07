import { axiosInstance } from "../axiosInstance";

export const FetchOneAdmission = async (id) => {
  try {
    const result = axiosInstance.get(`/showPatientAdmission/${parseInt(id)}`);
    if (result) {
      console.log("Fetched Patient Admission:", result);
      return result;
    } else {
      console.log("no data returned");
    }
  } catch (error) {
    console.log("Error in fetch patient addmision", error);
  }
};
