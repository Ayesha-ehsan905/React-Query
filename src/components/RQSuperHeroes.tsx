import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import SuperHeroes from "./SuperHeroes";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const RQSuperHeroes = () => {
  const onSuccess = () => {
    console.log("Sucess");
  };
  const onError = () => {
    console.log("Error");
  };
  //super-heroes is the unqiue key for the query, same concept as for div
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      // staleTime: 30000,
      // refetchOnMount: true,
      // refetchOnWindowFocus: true,
      // refetchInterval: 2000,
      // refetchIntervalInBackground: true,
      enabled: false, //not to fire when componenet mount
      onError,
      onSuccess,
      select: (data) => {
        const superHeroes = data?.data.map((hero) => hero.name);
        return superHeroes;
      },
    }
  );
  console.log("loading", isLoading, "Fetching", isFetching);
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <div>RQSuperHeroes</div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data.map((item) => {
        return <h2 key={item.name}>{item.name}</h2>;
      })}
    </>
  );
};

export default RQSuperHeroes;
