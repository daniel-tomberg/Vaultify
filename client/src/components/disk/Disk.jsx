import React from 'react';
import Folder2 from "../../assets/img/filefolder.svg";
import File2 from "../../assets/img/file.svg";

const Disk = () => {
    return (
        <div>
            DISK
            <img src={Folder2} alt="" className="folder2"/>
            <img src={File2} alt="" className="file2"/>

        </div>
    );
};

export default Disk;