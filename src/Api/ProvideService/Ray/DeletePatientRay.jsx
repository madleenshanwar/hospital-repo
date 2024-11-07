import { axiosInstance } from "../../axiosInstance";

export const DeletePatientRay = async (id) => {
  console.log(id);
  try {
    const result = await axiosInstance.delete(`/patientRay/${parseInt(id)}`);
    if (result) {
      console.log("Delete patientRay Done", result);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.log("error in delete patientRay ", error);
  }
};
