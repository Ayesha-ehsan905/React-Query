import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

    //fn to get the only selected data from the list
    // select: (data) => {
    //   const superHeroes = data?.data.map((hero: { name: any }) => hero.name);
    //   return superHeroes;
    // },
  });
};

const addSuperHero = (hero: any) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    //invalidate the query of super0heroes if the post call is sucessfull to that it willl call the query to get
    //all the record so  that userdoesnot have to hardreload
    // onway
    // onSuccess: () => {
    //   queryClient.invalidateQueries("super-heroes");
    // },
    //other way
    //  of doing to sve the call by aappending it into prevouis data as mutation call retutn the current data
    onSuccess: (data) => {
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
