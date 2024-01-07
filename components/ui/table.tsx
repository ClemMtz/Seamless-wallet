import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";

interface Column {
    key: string;
    label: string;
}

interface Row {
    id: string;
    status: string;
    from: string;
    to: string;
    amount: number;
    [key: string]: string | number;
}

interface TransactionTableProps {
    columns: Column[];
    rows: Row[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ columns, rows }) => {
    return (
        <Table aria-label="Example table with static content">
            <TableHeader>
                {columns.map((column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        {columns.map((column) => (
                            <TableCell key={column.key}>{row[column.key]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TransactionTable;

