const { SORT_STATE } = require("../constanst")

exports.nextSortState = (state) => {
   if (state == SORT_STATE.none) return SORT_STATE.increasing;
   if (state == SORT_STATE.increasing) return SORT_STATE.decreasing;
   return SORT_STATE.none;
}

exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }