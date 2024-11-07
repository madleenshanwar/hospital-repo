import { axiosInstance } from "../axiosInstance";

export const Dischargepatient = async (info, id) => {
  try {
    const result = await axiosInstance.patch(`/PatientDischarge/${id}`, info, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      console.log("Discharge Patient:", result.data);
      return result;
    } else {
      console.error("No data returned");
      return null;
    }
  } catch (error) {
    console.error("Error in discharge patient", error);
    return null;
  }
};
