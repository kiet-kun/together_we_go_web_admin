import { SORT_STATE } from "../constanst"
import { toast } from 'react-toastify';

export const nextSortState = (state) => {
   if (state == SORT_STATE.none) return SORT_STATE.increasing;
   if (state == SORT_STATE.increasing) return SORT_STATE.decreasing;
   return SORT_STATE.none;
}

export const sleep = (ms) => {
   return new Promise(resolve => setTimeout(resolve, ms));
}

export const customStr = (str, limit = 20) => {
   // return "kiet";
   str = String(str);
   if (!str) return "Trống";
   if (str.length <= limit) {
      return str;
  } else {
      return str.substr(0, limit) + "...";
  }
}

export const formatDate = (str) => {
   const currentDate = new Date(str);
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
   const day = String(currentDate.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`;
}

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
 }

 export const genPassword = () => {
   let res = "";
   for (let i = 0; i < 6 ; i++) res+= String(getRandomInt(10));
   return res;
}

export const formatDateWithTime = (str) => {
   const currentDate = new Date(str);
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
   const day = String(currentDate.getDate()).padStart(2, '0');
   const hour = String(currentDate.getHours()).padStart(2, '0');
   const minus = String(currentDate.getMinutes()).padStart(2, '0');
   return `${hour}:${minus} ${day}-${month}-${year}`;
}

export const notifyAfterCallApi = (response, successText = 'Thành công', errorText = 'Thất bại') => {
   if (response.status == 200) {
      toast.success(successText);
   }
   else {
      toast.error(errorText);
   }
}
