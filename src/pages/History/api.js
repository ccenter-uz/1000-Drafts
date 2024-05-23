import { api } from "../../app/utils/api";

// GET
export const GET = async (search = "null", page, pageSize) => {
  return api
    .get("/users", { params: { search, page, pageSize } })
    .then((res) => res.data);
};

// RETURN
export const RETURN = async (body) => {
  // return api.post("/users", body).then((res) => res.data);
};
