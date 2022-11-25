import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParalle = ({ heroIds }) => {
  const data = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  return (
    <div>
      Dynamic Parallel Queries
      {data.map((item: any) => {
        return <h2 key={item?.data.data.name}>{item?.data.data.name}</h2>;
      })}
    </div>
  );
};
