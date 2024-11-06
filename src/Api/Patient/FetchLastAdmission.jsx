import { axiosInstance } from "../axiosInstance";

export const FetchLastAdmission = async (id) => {
  try {
    const result = axiosInstance.get(`/PatientLastAdmission/${parseInt(id)}`);
    if (result) {
      console.log("Fetched Last Admission:", result);
      return result;
    } else {
      console.log("no data returned");
    }
  } catch (error) {
    console.log("Error in fetch last addmision", error);
  }
};
