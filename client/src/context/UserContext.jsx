import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Context = createContext();

function UserContext({ children }) {
  const [usernameLogged, setUsernameLogged] = useState("");
  const [loading, setLoading] = useState(true);

  console.log(loading);

  useEffect(() => {
    console.log("done");
    axios
      .get("/profile")
      .then((response) => {
        setLoading(false);
        setUsernameLogged(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Context.Provider
      value={{ usernameLogged, setUsernameLogged, loading, setLoading }}
    >
      {children}
    </Context.Provider>
  );
}

export default UserContext;
