import decode from "jwt-decode";
import { tokenName } from "../../utils/static_constants";

export default () => {
  const token = localStorage.getItem(tokenName);

  try {
    decode(token);
    return true;
  } catch (error) {
    return false;
  }
};
