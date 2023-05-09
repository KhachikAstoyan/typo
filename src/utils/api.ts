import axios from "axios";

export const fetchStats = (id: string) => async () =>
  axios.get(`/api/users/stats/${id}`).then((r) => r.data);
