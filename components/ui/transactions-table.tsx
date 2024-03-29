import { TransactionTableProps } from "@/utils/types";

const TransactionTable = ({ columns, rows }: TransactionTableProps) => {
  return (
    <table className="mt-2 flex flex-col justify-center gap-1 text-sm">
      <thead>
        <tr className=" flex justify-center gap-[6.5rem]">
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody className="h-[6rem] transaction-table  overflow-auto">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td className="pt-1 pb-2 pr-2 pl-[0.6rem]" key={colIndex}>
                {column === "From" ? (
                  <>
                    <span className="text-gray-600">{row.Date}</span>
                    <span className="flex flex-col gap-1">{row.From}</span>
                  </>
                ) : (
                  <div className="mt-[1.2rem]">{row[column]}</div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
