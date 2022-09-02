import { useContext } from "react";
import { Context } from "../context/context";
import Breakpoints from "../helper functions/Breakpoints";
import ProcessImages from "../helper functions/ProcessImages";
import { Typography } from "@material-tailwind/react";
import "./../../styles/main components/LandingPage.css";

const LandingPage = () => {
  const { state, dispatch } = useContext(Context);

  return (
    <label htmlFor="dropzone-file" className="label">
      <div className="div">
        <svg
          aria-hidden="true"
          className="svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <Typography
          variant={Breakpoints(state.screenSize) === "sm" ? "h5" : "h3"}
        >
          Click to upload
        </Typography>
        <Typography
          className={
            Breakpoints(state.screenSize) === "sm"
              ? "text-sm dark:text-white"
              : "text-lg dark:text-white"
          }
        >
          Please, zip your images to upload!
        </Typography>
      </div>
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={(e) => {
          dispatch({ type: "INIT_LABELS", labels: [] });
          ProcessImages(state, dispatch, e, false);
        }}
        accept=".zip,.rar,.7zip,.jpg,.png,.gif,.ps,.jpeg,.webp"
      />
    </label>
  );
};

export default LandingPage;
