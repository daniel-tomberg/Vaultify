import React from 'react';
import './file.css'

import dirLogo from '../../../../assets/img/folder3.svg'
import fileLogo from '../../../../assets/img/file3.svg'
import imgFileLogo from '../../../../assets/img/imgFile3.svg'
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);

    function openDirHandler(file){
        if(file.type === 'dir'){
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    return (
        <div className='file' onClick={()=> openDirHandler(file)}>
            <img
                src={file.type === 'dir' ? dirLogo : (file.type === 'jpg' || file.type === 'png') ? imgFileLogo : fileLogo}
                alt=""
                className="file__img"
            />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date?.slice(0, 10) || "Unknown"}</div>
            <div className="file__size">{file.size}</div>
        </div>
    );
};

export default File;