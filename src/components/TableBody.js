import { useEffect, useState } from "react";

export default function TableBody(props) {
  const [tableData, setTableData] = useState(props.data);

  useEffect(() => {
    setTableData(props.data);
  })

  return (
    <tbody>
      {tableData === null ? <div></div> : tableData.map((data) => {
        return (
          <tr key={data.id}>
            {props.columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : "——";
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

