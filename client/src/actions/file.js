// import axios from 'axios'
// import {addFile, setFiles} from "../reducers/fileReducer";
//
// export function getFiles(dirId) {
//     return async dispatch => {
//         try {
//             const response = await axios.get(`http://localhost:5003/api/files${dirId ? '?parent='+dirId : ''}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//
//             console.log("API Response:", response.data);
//
//             if (Array.isArray(response.data)) {
//                 dispatch(setFiles(response.data));
//             } else {
//                 console.error("API did not return an array", response.data);
//                 dispatch(setFiles([]));
//             }
//         } catch (e) {
//             console.error("Error fetching files:", e);
//             alert(e?.response?.data?.message || "An error occurred while fetching files");
//         }
//     }
// }
import axios from 'axios'
import {addFile, setFiles} from "../reducers/fileReducer";

export function getFiles(dirId) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5003/api/files${dirId ? '?parent='+dirId : ''}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5003/api/files`,{
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const response = await axios.post(`http://localhost:5003/api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            });
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

