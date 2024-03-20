import { API_GET_ADDRESS_BOOK } from "@/utils/api-urls";
import { AddressBookData } from "@/utils/types";
import axios, { AxiosResponse } from "axios";

// export const getAddressBook = async (): Promise<AddressBookData[]> => {
//   try {
//     const response: AxiosResponse<AddressBookData[]> = await axios.get(
//       API_GET_ADDRESS_BOOK
//     );

//     const addressBookData: AddressBookData[] = response.data;

//     return addressBookData;
//   } catch (error) {
//     console.error("Error fetching AdressBook:", error);
//     throw error;
//   }
// };

export const getAddressBook = async (): Promise<AddressBookData[]> => {
  try {
    const response: AxiosResponse<AddressBookData[]> = await axios.get(
      API_GET_ADDRESS_BOOK,
      {
        headers: {
          // Include cache control headers to prevent caching
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );

    const addressBookData: AddressBookData[] = response.data;

    return addressBookData;
  } catch (error) {
    console.error("Error fetching AddressBook:", error);
    throw error;
  }
};
