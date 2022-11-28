import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchData = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};
export const PaginatedQueries = () => {
  const [pageNumber, setpageNumber] = useState(1);
  const { data, isLoading, error, isError, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchData(pageNumber),
    {
      keepPreviousData: true,
    }
  );
  if (isLoading) return <h2>Loading....</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <div>
        PaginatedQueries
        {data?.data.map((colors) => {
          return (
            <div key={colors.id}>
              <h2>
                {colors.id}-{colors.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setpageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev
        </button>

        <button
          onClick={() => setpageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next
        </button>
      </div>
      {isFetching && "loading"}
    </>
  );
};
