import { BackendURL } from "@/lib/constant";
import axios from "axios";

export const uploadImage = async (img)=>{
    try {
        let imageUrl = null;

        await axios.get(`${BackendURL}/get-upload-url`,{
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(async(result) => {
            await axios({
                method:'PUT',
                url:result?.data?.data,
                headers:{'Content-Type':'multipart/form-data'},
                data:img
            }).then(()=>{
                imageUrl = result?.data?.data && result?.data?.data.split('?')[0]
            })
        })

        return imageUrl
    } catch (error) {
        console.log("error",error)
    }
}