import { useEffect, useState, usePrevious } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const rows = 10;

export default function Table(props) {
    const [tableData, setTableData] = useState(props.data);
    const [columns, setColumns] = useState(props.columns);
    const [state, setState] = useState({
        data_part: props.data_part,
        page: 0,
        count: props.count,
        firstButton: true,
        prevButton: true,
        nextButton: false,
        lastButton: false
    });

    useEffect(() => {
        setTableData(props.data);
        setColumns(props.columns);
        setState(previousState => ({
            ...previousState,
            page: 0,
            count: props.count,
            data_part: props.data_part,
        }))
    }, [props])

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...tableData].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            let data_part = sorted.slice(state.page * rows, state.page * rows + rows);
            setTableData(sorted);
            setState(previousState => ({
                ...previousState,
                data_part: data_part
            }));
        }
    };

    const firstPage = () => {
        let data_part = tableData.slice(0, rows);
        setState(previousState => ({
            ...previousState,
            data_part: data_part,
            page: 0,
            firstButton: true,
            prevButton: true,
            nextButton: false,
            lastButton: false
        }));
    }

    const previousPage = () => {
        let data_part = tableData.slice((state.page - 1) * rows, (state.page - 1) * rows + rows);
        let page = state.page - 1;
        let firstState = page === 0 ? true : false;
        setState(previousState => ({
            ...previousState,
            data_part: data_part,
            page: page,
            firstButton: firstState,
            prevButton: firstState,
            nextButton: false,
            lastButton: false
        }));
    }

    const nextPage = () => {
        let data_part = tableData.slice((state.page + 1) * rows, (state.page + 1) * rows + rows);
        let page = state.page + 1;
        let lastState = state.count === page + 1 ? true : false;
        setState(previousState => ({
            ...previousState,
            data_part: data_part,
            page: page,
            firstButton: false,
            prevButton: false,
            nextButton: lastState,
            lastButton: lastState
        }));
    }

    const lastPage = () => {
        let pages = tableData.length % rows;
        if (pages === 0) {
            pages = -rows;
        }
        else {
            pages = -pages;
        }
        let data_part = tableData.slice(pages);
        let count = state.count - 1;
        setState(previousState => ({
            ...previousState,
            data_part: data_part,
            page: count,
            firstButton: false,
            prevButton: false,
            nextButton: true,
            lastButton: true
        }));
    }


    return (
        <div>
            <table className="table">
                <TableHead columns={columns} handleSorting={handleSorting} />
                <TableBody columns={columns} data={state.data_part} />
            </table>
            <Pagination>
                    <PaginationItem disabled={state.firstButton}>
                        <PaginationLink first onClick={firstPage} />
                    </PaginationItem>
                    <PaginationItem disabled={state.prevButton} >
                        <PaginationLink previous onClick={previousPage} />
                    </PaginationItem>
                    <PaginationItem disabled={state.nextButton}>
                        <PaginationLink next onClick={nextPage} />
                    </PaginationItem>
                    <PaginationItem disabled={state.lastButton}>
                        <PaginationLink last onClick={lastPage} />
                    </PaginationItem>
                    <div style={{ marginLeft: "10px", marginTop: "9px" }}><nav>Страница {state.page + 1} из {state.count}</nav></div>
                </Pagination>
        </div>
    );
};

