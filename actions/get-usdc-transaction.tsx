import { API_POLYGON_SCAN } from "@/utils/api-urls";
import { UsdcData } from "@/utils/types";
import axios from "axios";

export const GetUsdcTransaction = async (params: UsdcData): Promise<any> => {
  try {
    const response = await axios.get(API_POLYGON_SCAN, { params });
    return response.data;
  } catch (error) {
    console.error("Error calling API:", error);
    throw error;
  }
};
