import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};
const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};
export const DependentQueries = ({ email }) => {
  const { data } = useQuery(["user", email], () => fetchUserByEmail(email));
  const channelId = data?.data.channelId;
  const { data: course } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );
  course?.data.courses.map((item) => {
    console.log(item);
  });

  return <div></div>;
};
