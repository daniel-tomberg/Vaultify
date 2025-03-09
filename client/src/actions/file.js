import axios from 'axios'
import {setFiles} from "../reducers/fileReducer";

export function getFiles(dirId) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5003/api/files${dirId ? '?parent='+dirId : ''}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            console.log("API Response:", response.data);

            if (Array.isArray(response.data)) {
                dispatch(setFiles(response.data));
            } else {
                console.error("API did not return an array", response.data);
                dispatch(setFiles([]));
            }
        } catch (e) {
            console.error("Error fetching files:", e);
            alert(e?.response?.data?.message || "An error occurred while fetching files");
        }
    }
}



