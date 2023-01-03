import { API } from "aws-amplify";

export async function list() {
  return await API.get("pantry_partner", "/list");
}

export async function save(data) {
  return await API.post("pantry_partner", "/create", {
    body: data,
  });
}
