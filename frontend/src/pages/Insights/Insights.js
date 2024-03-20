import React, { useEffect, useState } from "react";
import { useFilters, useTable } from "react-table";
import InsightsService from "../../Services/InsightsService";
import { RiSearchLine } from "react-icons/ri";
import "./index.css";

export const Insights = () => {
  const [insights, setInsights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const TOTAL_INSIGHTS_COUNT = 1000;
  const ITEMS_PER_PAGE = 100;
  const totalPages = Math.ceil(TOTAL_INSIGHTS_COUNT / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await InsightsService.fetchInsightsByPage(
          currentPage,
          searchQuery
        );
        setInsights(data);
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    fetchInsights();
  }, [currentPage, searchQuery]);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Sector",
        accessor: "sector",
      },
      {
        Header: "Topic",
        accessor: "topic",
      },
      {
        Header: "Region",
        accessor: "region",
      },
      {
        Header: "Published",
        accessor: "published",
        Cell: ({ value }) => formatDate(value),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: insights,
        initialState: {
          filters: [{ id: "title", value: searchQuery }],
        },
      },
      useFilters
    );

  const formatDate = (dateString) => {
    const options = { month: "long", day: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ marginTop: "9rem" }}>
      <div className="table__input_container">
        <RiSearchLine />
        <input
          className="table__input"
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search by title..."
        />
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid rgba(212, 207, 255, 0.5)",
        }}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              key={headerGroup.id}
              style={{ background: "rgba(214, 209, 255, 0.5)" }}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  style={{
                    padding: "1.6rem",
                    textAlign: "left",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "rgba(27, 37, 75, 1)",
                    border: "1px solid rgba(212, 207, 255, 0.5)",
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                key={index}
                style={{
                  background: index % 2 === 0 ? "rgba(214, 209, 255, 0.1)" : "",
                }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      key={cell.getCellProps().key}
                      style={{
                        padding: "1.6rem",
                        textAlign: "left",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                        color: "rgba(27, 37, 75, 0.7)",
                        border: "1px solid rgba(212, 207, 255, 0.5)",
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={"pagination__container"}>
        <button
          className="pagination__button"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span className={"pagination__text"}>Page {currentPage}</span>
        <button
          className="pagination__button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};
