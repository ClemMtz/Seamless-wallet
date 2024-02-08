import { getAddressBook } from "@/actions/get-address-book";
import { act, render } from "@testing-library/react";
import { useEffect, useState } from "react";

jest.mock(
  "c:/Users/clemm/OneDrive/Documents/seamless-wallet/actions/get-address-book"
);

describe("useEffect hook", () => {
  it("fetches address book data on mount", async () => {
    const mockData = [
      {
        id: "1",
        name: "John Doe",
        address: "123 Main St",
        publicAddress: "0x123",
        createdAt: "2022-01-01T00:00:00Z",
        updatedAt: "2022-01-01T00:00:00Z",
      },
    ];

    getAddressBook.mockResolvedValue(mockData);

    let result;
    function Component() {
      const [addressBookData, setAddressBookData] = useState([]);
      const publicAddress = "0x123";

      useEffect(() => {
        const fetchAddressBookData = async () => {
          try {
            const addressBook = await getAddressBook();
            setAddressBookData(addressBook);
          } catch (error) {
            console.error("Error fetching transactions:", error);
          }
        };

        fetchAddressBookData();
      }, [publicAddress]);

      result = addressBookData;
      return null;
    }

    render(<Component />);
    await act(async () => {});

    expect(result).toEqual(mockData);
  });
});
