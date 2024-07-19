import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "006f55146afe41bda932c394cf228fee",
  },
});
