const AddressBookTable = ({ columns, rows }: any) => {
  return (
    <table className="mt-2 flex flex-col justify-center  gap-1 text-sm z-10">
      <thead>
        <tr className=" flex justify-center gap-16">
          {columns.map((column: any, index: any) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody className="mr-auto ml-auto overflow-y-auto scroll-y h-[26rem] addressBook-table ">
        {rows.map((row: any, rowIndex: any) => (
          <tr key={rowIndex}>
            {columns.map((column: any, colIndex: any) => (
              <td key={colIndex}>
                {column === "Name" ? (
                  <div className=" w-20   ">
                    <span className="text-gray-800 ml-1  ">{row.Name}</span>
                  </div>
                ) : column === "Address" ? (
                  <span className="text-gray-800 mr-6 ml-6 ">
                    {row.Address}
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
