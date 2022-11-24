import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useSuperHeroesList } from "../hooks/useSuperHeroesList";

const RQSuperHeroes = () => {
  const onSuccess = () => {
    console.log("Sucess");
  };
  const onError = () => {
    console.log("Error");
  };
  //super-heroes is the unqiue key for the query, same concept as for div
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesList(onSuccess, onError);
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <div>RQSuperHeroes</div>
      <button onClick={refetch}>Fetch Heroes</button>
      {/* select data scenior where we select and display  */}
      {/* {data.map((item: any) => {
        return <h2 key={item}>{item}</h2>;
      })} */}
      {data?.data.map((item: any) => {
        return <h2 key={item.alterEgo}>{item.alterEgo}</h2>;
      })}
    </>
  );
};

export default RQSuperHeroes;
