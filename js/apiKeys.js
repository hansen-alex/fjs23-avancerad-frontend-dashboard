import axios from "axios";

export const getApiKeys = async () => {
  const result = await axios.get("../api-keys.json");
  return result.data;
};
