import React from 'react';
import './fileList.css';
import { useSelector } from 'react-redux';
import File from './file/File';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const FileList = () => {
    const files = useSelector(state => Array.isArray(state.files?.files) ? state.files.files : []);

    if(files.length === 0){
        return null;
    }

    return (
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Name</div>
                <div className="filelist__access">Access</div>
                <div className="filelist__date">Date modified</div>
                <div className="filelist__size">Size</div>
            </div>

            {files.length > 0 ? (
                <TransitionGroup>
                    {files.map(file => (
                        <CSSTransition
                            key={file._id || file.name}
                            timeout={500}
                            classNames="file"
                        >
                            <File file={file} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            ) : (
                <div className="filelist__empty">No available files</div>
            )}
        </div>
    );
};

export default FileList;
