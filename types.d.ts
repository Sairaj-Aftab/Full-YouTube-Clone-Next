type user = {
  name?: string;
  email: string;
  password?: string;
};

type sessionUser = {
  user: {
    name: string;
    email: string;
    image: string | undefined | null;
    id: string;
  };
  expires: string;
};

type input = {
  title: string;
  desc: string;
  video: File | undefined | null;
  thumbnail: File | undefined | null;
};
type fileState = React.Dispatch<React.SetStateAction<File | undefined>>;
type stringState = React.Dispatch<React.SetStateAction<string | null>>;
type numberState = React.Dispatch<React.SetStateAction<number | null>>;
