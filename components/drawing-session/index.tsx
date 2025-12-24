"use client";

import { useCallback, useEffect } from "react";
import { Controller } from "@/components/drawing-session/controller";
import { CurrentImage } from "@/components/drawing-session/current-image";
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { Timer } from "@/components/drawing-session/timer";
import { Button } from "../ui/button";
import Link from "next/link";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { fetcher } from "@/lib/api/pinterest/queries";
import { ImageSourceResponse, Pin } from "@/app/types";
import useSWR from "swr";
import { auth } from "@/auth";

export const testWithCursor = (boardId: string) => async () => {
  const cursor =
    "LT4xMzY0NDUwNjM3MDIxNzAxMjZ8MjUwfDEwOTYzOTQzMzg2MjkwMTQqR1FMKnw3YzllMjQxZjI4OGZhNWQ2YTQzY2U0OGU0YmJiYTA3MDQ0MzFiYjkzNDllMTVhMDI3MTYxNTNlYWEzMmJlMDg2fE5FV3w=";
  const session = await auth();

  if (!session) {
    return {
      bookmark: "",
      items: [],
    };
  }
  const response = await fetch(
    `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=25${cursor}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  return await response.json();
};

const getKey =
  (boardId: string | undefined): SWRInfiniteKeyLoader =>
  (pageIndex: number, previousPageData: ImageSourceResponse<Pin>) => {
    console.log("getKey", boardId, pageIndex, previousPageData);
    // if (boardId === undefined) {
    //   return null;
    // }
    // reached the end
    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=25`;
    }
    // add the cursor to the API endpoint

    if (!previousPageData?.bookmark) {
      console.log("reached the end");
      return null;
    }
    // `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=250${cursorSearchParam}`,
    return `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=25&bookmark=${previousPageData.bookmark}`;
  };

export default function DrawingSession() {
  const { state, dispatch } = useDrawingSessionContext();

  const { data, isLoading, error, size } = useSWRInfinite(
    getKey(state.boardId),
    fetcher,
    {
      initialSize: 5,
    },
  );

  // useEffect(() => {
  //   console.log({ data, isLoading, error, size });
  // }, [data, isLoading, error, size]);

  // const { data, isLoading, error } = useSWR(
  //   "LT4xMzY0NDUwNjM3MDIxNzAxMjZ8MjUwfDEwOTYzOTQzMzg2MjkwMTQqR1FMKnw3YzllMjQxZjI4OGZhNWQ2YTQzY2U0OGU0YmJiYTA3MDQ0MzFiYjkzNDllMTVhMDI3MTYxNTNlYWEzMmJlMDg2fE5FV3w=",
  //   testWithCursor("136445132399848892"),
  // );

  useEffect(() => {
    console.log({ data, isLoading, error });
  }, [data, isLoading, error]);

  const handleForward = useCallback(() => {
    dispatch({ type: "FORWARD" });
  }, [dispatch]);

  return (
    <div className="py-12 px-4 h-screen w-full">
      {state.isStopped ? (
        <div className="flex flex-col justify-center space-y-4 items-center h-full">
          <p className="">Session Complete</p>
          <div>
            <Link href={"/app"}>
              <Button>Back</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center space-y-4 items-center h-full">
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            {state.current && <CurrentImage src={state.current.src} />}
          </div>
          <Controller />
          {state.current && (
            <Timer
              seconds={state.current.interval}
              onTimeElapsed={handleForward}
              isPaused={state.isPaused}
            />
          )}
        </div>
      )}
    </div>
  );
}
