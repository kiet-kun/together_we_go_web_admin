// https://www.zacfukuda.com/blog/pagination-algorithm

function getNumberOfPages(rowCount, rowsPerPage) {
  return Math.ceil(rowCount / rowsPerPage);
}

function paginate(current, max) {
	if (!current || !max) return [1]

	let prev = current === 1 ? null : current - 1,
			next = current === max ? null : current + 1,
			items = [1]

	if (current === 1 && max === 1) return {current, prev, next, items}
	if (current > 4) items.push('…')

	let r = 2, r1 = current - r, r2 = current + r

	for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i)

	if (r2 + 1 < max) items.push('…')
	if (r2 < max) items.push(max)

	// return {current, prev, next, items}
  return items;
}

const MyPagination = ({
    totalInDB, 
    page, setPage,
    pageSize,
    loadPage,
    isLoading
  }) => {
    const numPages = getNumberOfPages(totalInDB, pageSize);
    const handleBackButtonClick = () => {
      if (isLoading) return;
      if (page == 1) return;
      setPage(page - 1);
      loadPage();
    };
  
    const handleNextButtonClick = () => {
      if (isLoading) return;
      if (page == numPages) return;
      setPage(page + 1);
      loadPage();
    };
  
    const handlePageNumber = (e) => {
      if (isLoading) return;
      let value = e.target.value;
      if (value == '...' ||  numPages == Number(value)) return;
      setPage(Number(value));
      loadPage();
    };
    

    let pageItems = paginate(page, numPages);

    return (
      <nav aria-label="Page navigation example">

    
      <ul class="pagination">
      <li class="page-item">
              <button className="page-link" onClick={handleBackButtonClick}>
                Trước
              </button>
 
      </li>


      {pageItems.map((value) => {
            const className =
              value === page ? "page-item active" : "page-item";
  
            return (
              <li key={value} className={className}>
                <button
                  className="page-link"
                  onClick={handlePageNumber}
                  value={value}
                >
                  {value}
                </button>
              </li>
            );
      })}

      <li class="page-item">
              <button className="page-link" onClick={handleNextButtonClick}>
                Sau
              </button>
      </li>
      
      </ul>
      </nav>
    );
  };

  export default MyPagination;
  