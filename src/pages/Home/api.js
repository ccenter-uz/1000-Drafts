import { api } from "../../app/utils/api";

// GET
export const GET = async (search, page, pageSize) => {
  return api
    .get("getAll", { params: { search, page, pageSize } })
    .then((res) => res.data);
};

// CREATE
export const CREATE = async (body) => {
  return api.post("drafts", body).then((res) => res.data);
};

// END
export const END = async (body) => {
  return api.post("moveToHistory", body).then((res) => res.data);
};
