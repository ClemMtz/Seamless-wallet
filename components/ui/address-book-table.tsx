import React from 'react'

const AddressBookTable = ({ columns, rows }: any) => {
    return (
        <table className="mt-2 flex flex-col justify-center  gap-1 text-sm">
            <thead>
                <tr className=" flex justify-center gap-20">
                    {columns.map((column: any, index: any) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody className='mr-auto ml-auto  '>
                {rows.map((row: any, rowIndex: any) => (
                    <tr key={rowIndex}>
                        {columns.map((column: any, colIndex: any) => (
                            <td key={colIndex}>
                                {column === 'Name' ? (
                                    <>
                                        <span className="text-gray-800">{row.Name}</span>
                                    </>
                                ) : column === 'Address' ? (
                                    <>
                                        <span className="text-gray-800 pr-12 pl-16">{row.Address}</span>
                                    </>
                                ) :
                                    <div className='mb-4 mt-4'>{row[column]}</div>
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AddressBookTable;
