import { useNavigate } from "react-router-dom";

const useAppNavigate = () => {
    const navigate = useNavigate();

    const handleNavigate = (page_name) => {
      navigate(page_name);
    }
  
    return [handleNavigate];
};

export default useAppNavigate;