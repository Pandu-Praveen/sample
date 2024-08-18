interface AppConfig {
  name: string;
  github: {
    title: string;
    url: string;
  };
}

export const appConfig: AppConfig = {
  name: "Hello Karthi",
  github: {
    title: "Shadcn Sample",
    url: "https://github.com/",
  },
};
