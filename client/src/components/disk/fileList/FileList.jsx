import React from 'react';
import './fileList.css';
import { useSelector } from 'react-redux';
import File from './file/File';

const FileList = () => {
    const files = useSelector(state => Array.isArray(state.files?.files) ? state.files.files : []);

    return (
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Name</div>
                <div className="filelist__access">Who can access</div>
                <div className="filelist__date">Date modified</div>
                {/*<div className="filelist__size">Size</div>*/}
            </div>

            {files.length > 0 ? (
                files.map(file => (
                    <File key={file._id || file.name} file={file} />
                ))
            ) : (
                <div className="filelist__empty">No available files</div>
            )}
        </div>
    );
};

export default FileList;
