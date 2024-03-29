const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  about: "/about",
} as const;

type TypeOfRoutes = (typeof routes)[keyof typeof routes];

export { routes };
export type { TypeOfRoutes };
