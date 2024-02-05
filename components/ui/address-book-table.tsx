import useStore from "@/store";
import { TransactionTableProps } from "@/utils/types";

const AddressBookTable = ({ columns, rows }: TransactionTableProps) => {
  const { searchResult } = useStore();
  const displayRows = searchResult ? searchResult : rows;

  return (
    <table className="mt-2 flex flex-col justify-center gap-1 text-sm z-10">
      <thead>
        <tr className="flex justify-center gap-16">
          {columns.map((column: any, index: any) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody className="mr-auto ml-auto overflow-y-auto scroll-y h-[24rem] addressBook-table">
        {displayRows.map((row: any, index: any) => (
          <tr key={index}>
            {columns.map((column: any, colIndex: any) => (
              <td key={colIndex}>
                {column === "Name" ? (
                  <div className="w-20">
                    <span className="text-gray-800 ml-1">{row[column]}</span>
                  </div>
                ) : column === "Address" ? (
                  <span className="text-gray-800 mr-6 ml-6 ">
                    {row[column]}
                  </span>
                ) : (
                  <div className="mb-4 mt-4 mr-4">{row[column]}</div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AddressBookTable;
