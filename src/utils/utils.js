const { SORT_STATE } = require("../constanst")

exports.nextSortState = (state) => {
   if (state == SORT_STATE.none) return SORT_STATE.increasing;
   if (state == SORT_STATE.increasing) return SORT_STATE.decreasing;
   return SORT_STATE.none;
}

exports.sleep = (ms) => {
   return new Promise(resolve => setTimeout(resolve, ms));
}

exports.customStr = (str, limit = 20) => {
   // return "kiet";
   str = String(str);
   if (!str) return "Trống";
   if (str.length <= limit) {
      return str;
  } else {
      return str.substr(0, limit) + "...";
  }
}

exports.formatDate = (str) => {
   const currentDate = new Date(str);
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
   const day = String(currentDate.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`;
}

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
 }

exports.genPassword = () => {
   let res = "";
   for (let i = 0; i < 6 ; i++) res+= String(getRandomInt(10));
   return res;
}