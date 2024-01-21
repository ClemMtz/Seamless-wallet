import React from 'react'

const AddressBookTable = ({ columns, rows }: any) => {
    return (
        <table className="mt-2 flex flex-col justify-center  gap-1 text-sm">
            <thead>
                <tr className=" flex justify-center gap-[6.5rem]">
                    {columns.map((column: any, index: any) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody className=" ">
                {rows.map((row: any, rowIndex: any) => (
                    <tr key={rowIndex} >
                        {columns.map((column: any, colIndex: any) => (
                            <td className="pt-1 pb-2 pr-2 pl-[0.6rem]" key={colIndex}>
                                {/* {column === 'Name' ? (
                                    <span className="text-gray-600">{row.Name}</span>
                                ) : ( */}
                                <div className="">{row[column]}</div>
                                {/* )} */}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AddressBookTable;
