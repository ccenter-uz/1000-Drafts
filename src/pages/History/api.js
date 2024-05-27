import { api } from "../../app/utils/api";

// GET
export const GET = async (search, page, pageSize) => {
  return api
    .get("getHistory", { params: { search, page, pageSize } })
    .then((res) => res.data);
};

// RETURN
export const RETURN = async (body) => {
  return api.post("getFromHistory", body).then((res) => res.data);
};
