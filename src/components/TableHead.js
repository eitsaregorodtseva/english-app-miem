import { useState } from "react";

export default function TableHead(props) {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        props.handleSorting(accessor, sortOrder);
    };

    return (
        <thead>
            <tr>
                {props.columns.map(({ label, accessor, sortable }) => {
                    const cl = sortable
                        ? sortField && sortField === accessor && order === "asc"
                            ? "up"
                            : sortField && sortField === accessor && order === "desc"
                                ? "down"
                                : "default"
                        : "";
                    return (
                        <th
                            key={accessor}
                            onClick={sortable ? () => handleSortingChange(accessor) : null}
                            className={cl}
                        >
                            {label}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};