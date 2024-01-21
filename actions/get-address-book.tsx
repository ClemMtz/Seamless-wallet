import { API_GET_ADDRESS_BOOK } from "@/utils/api-urls";
import axios from "axios";
import { AxiosResponse } from "axios";
import { AddressBookData } from "@/utils/types";



export const getAddressBook = async (): Promise<AddressBookData[]> => {
    try {
        const response: AxiosResponse<AddressBookData[]> = await axios.get(API_GET_ADDRESS_BOOK);

        const addressBookData: AddressBookData[] = response.data;
        console.log('Address Book Data:', addressBookData);

        return addressBookData;



    } catch (error) {
        console.error('Error fetching AdressBook:', error);
        throw error;
    }
};
