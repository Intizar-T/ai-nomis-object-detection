import { useContext } from "react"
import { Context } from "../context/context";
import Breakpoints from "../helper functions/Breakpoints";
import ProcessImages from "../helper functions/ProcessImages";
import { Typography, } from '@material-tailwind/react';

const LandingPage = () => {
    const { state, dispatch } = useContext(Context);
    
    return(
        <label 
            htmlFor="dropzone-file" 
            className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <Typography variant={Breakpoints(state.screenSize) === 'sm' ? 'h5' : 'h3'}>
                  Click to upload
                </Typography>
                <Typography className={Breakpoints(state.screenSize) === 'sm' ? "text-sm dark:text-white" : "text-lg dark:text-white"}>
                  or drag and drop
                </Typography>
                <Typography className={Breakpoints(state.screenSize) === 'sm' ? "text-sm dark:text-white" : "text-lg dark:text-white"}>
                  Please, zip your images to upload!
                </Typography>
            </div>
            <input 
            id="dropzone-file" 
            type="file" 
            className="hidden"  
            onChange={(e) => {
                ProcessImages(state, dispatch, e.target.files);
            }}
            accept=".zip,.rar,.7zip"
            />
        </label>
    );
}

export default LandingPage;