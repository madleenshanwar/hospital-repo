import { axiosInstance } from "../../axiosInstance";

export const UpdatePatientRay = async (ray, id) => {
  try {
    const result = await axiosInstance.patch(
      `/patientRay/${parseInt(id)}`,
      ray,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result) {
      console.log("Update Patient Ray Done", result.data.data);
      return result;
    } else {
      console.error("no test found");
      return null;
    }
  } catch (error) {
    console.log("error in update patient ray", error);
  }
};
