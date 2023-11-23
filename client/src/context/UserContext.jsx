import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Context = createContext();

function UserContext({ children }) {
  const [usernameLogged, setUsernameLogged] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function auth() {
      await axios
        .get("/profile")
        .then((response) => {
          setUsernameLogged(response.data);
        })
        .catch((err) => {
          setUsernameLogged("");
          console.error(err);
        });
      setLoading(false);
    }
    auth();
  }, [loading]);

  return (
    <Context.Provider
      value={{ usernameLogged, setUsernameLogged, loading, setLoading }}
    >
      {children}
    </Context.Provider>
  );
}

export default UserContext;
