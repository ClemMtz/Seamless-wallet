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
            <tbody className="overflow-auto h-40 scrollbar-thumb-gray-300  scrollbar-track-transparent scrollbar-thin">
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} >
                        {columns.map((column, colIndex) => (
                            <td className="p-2" key={colIndex}>
                                {column === 'From' ? (
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
