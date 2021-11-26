import { client } from "lib/api/client"
import Cookies from "js-cookie"

export const getPlayers = () => {
  return client.get("/players", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}
