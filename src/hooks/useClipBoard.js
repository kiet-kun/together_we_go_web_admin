import { toast } from "react-toastify";

const useClipBoard = () => {

    const handleClipBoard = (content) =>{
        navigator.clipboard.writeText(content);
        toast('Đã copy', {
          autoClose: 1000,
        })
    }
    return [handleClipBoard];
};

export default useClipBoard;