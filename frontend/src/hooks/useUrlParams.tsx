import { useRouter } from "next/router";
import { useCallback } from "react";

const useURLParams = () => {
  const router = useRouter();

  const getQueryParam = useCallback(
    (key: string) => {
      if (router.query[key]) {
        try {
          return JSON.parse(router.query[key] as any);
        } catch (error) {
          return router.query[key];
        }
      }
      return null;
    },
    [router.query]
  );

  const isPlainObject = (value: any) => {
    return Object.prototype.toString.call(value) === "[object Object]";
  };

  const setQueryParam = useCallback(
    (key: string, value: any) => {
      const query = {
        ...router.query,
        [key]: isPlainObject(value) ? JSON.stringify(value) : value,
      };

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  const deleteQueryParam = useCallback(
    (key: string) => {
      const query = { ...router.query };
      delete query[key];

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  return { getQueryParam, setQueryParam, deleteQueryParam };
};

export default useURLParams;
