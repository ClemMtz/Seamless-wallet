import { TransactionTableProps } from "@/utils/types";

const TransactionTable = ({ columns, rows }: TransactionTableProps) => {
    return (
        <table className="mt-2 flex flex-col justify-center gap-2">
            <thead>
                <tr className=" flex justify-center gap-32">
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} >
                        {columns.map((column, colIndex) => (
                            <td className="pr-4" key={colIndex}>{row[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionTable;
