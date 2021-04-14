import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ITrademark } from "../interfaces";
import { headers } from "./fetch-helpers";

export const TMContext = createContext<{
  trademark: ITrademark[] | null;
  setTM: Dispatch<SetStateAction<ITrademark[] | null>>;
}>({
  trademark: null,
  setTM: () => {},
});

export const useTM = (): {
  saveTM: (tm: ITrademark[] | null) => void;
  trademark: ITrademark[] | null;
  fetchTM: (
    query: string,
    filters: string[]
  ) => Promise<{ data: ITrademark[] } | { data: null }>;
} => {
  const { trademark, setTM } = useContext(TMContext);

  const saveTM = (tm: ITrademark[] | null) => {
    setTM(tm);
  };

  const fetchTM = async (query: string, filters: string[]) => {
    try {
      const response = await fetch(
        "https://api.statsnet.co/api/global/trademarks",
        {
          method: "POST",
          body: JSON.stringify({ query, classifications: filters }),
          headers: {
            "Content-Type": "application/json",
            ...headers("drRN54UheELrwsNr2KjyAjBQKaU34RBc"),
          },
        }
      );
      const result: {
        data: ITrademark[];
        error: string | null;
      } = await response.json();
      setTM(result.data);
      if (result.error) {
        throw new Error(result.error);
      }
      return {
        data: result.data,
      };
    } catch (err) {
      console.log("Error when try to fetch trademarks: ", err.message);
      return {
        data: null,
      };
    }
  };

  return {
    saveTM,
    trademark,
    fetchTM,
  };
};

export const useCurrentTM = (): {
  trademark: ITrademark[] | null;
  setTM: Dispatch<SetStateAction<ITrademark[] | null>>;
} => {
  const [trademark, setTM] = useState<ITrademark[] | null>(null);
  return {
    trademark,
    setTM,
  };
};
