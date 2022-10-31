import { FetchEvent } from "../types";

export type ServerFunction<E extends any[], T extends (...args: [...E]) => void> = ((
  ...p: Parameters<T>
) => Promise<Awaited<ReturnType<T>>>) & {
  url: string;
  fetch: (init: RequestInit, ...args: any[]) => Promise<any>;
};

export type CreateServerFunction = (<E extends any[], T extends (...args: [...E]) => void>(
  fn: T
) => ServerFunction<E, T>) & {
  getHandler: (route: string) => any;
  createHandler: (fn: any, hash: string) => any;
  registerHandler: (route: string, handler: any) => any;
  hasHandler: (route: string) => boolean;
  createFetcher(route: string): ServerFunction<any, any>;
  fetch(route: string, init?: RequestInit): Promise<Response>;
} & FetchEvent;
