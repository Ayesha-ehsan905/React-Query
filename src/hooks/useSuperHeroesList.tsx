import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
export const useSuperHeroesList = (onError: any, onSuccess: any) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // staleTime: 30000,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    // refetchInterval: 2000,
    // refetchIntervalInBackground: true,
    // enabled: false, //not to fire when componenet mount
    onError,
    onSuccess,
    // select: (data) => {
    //   const superHeroes = data?.data.map((hero: { name: any }) => hero.name);
    //   return superHeroes;
    // },
  });
};
