import { api } from "../../app/utils/api";

// GET
export const GET = async (search = "null", page) => {
  return api
    .get("/users", { params: { search, page } })
    .then((res) => res.data);
};

// CREATE
export const CREATE = async (body) => {
  // return api.post("/users", body).then((res) => res.data);
};

// END
export const END = async (body) => {
  // return api.post("/users", body).then((res) => res.data);
};
