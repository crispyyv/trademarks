import md5 from "md5";
import { v4 as uuidv4 } from "uuid";

export const headers = (hash: string): Record<any, any> => {
  const uuid = uuidv4();
  const date = new Date().getTime();
  return {
    Accept: "*/*",
    "X-TOKEN": hash,
    "X-DATE": date,
    "X-REQUEST-ID": uuid,
    "X-SUM": md5(`${uuid}${date}`),
  };
};
