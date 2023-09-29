import Layout from '../../../layouts/layout';
import "./user.css";
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import movies from "./movies";

function getNumberOfPages(rowCount, rowsPerPage) {
    return Math.ceil(rowCount / rowsPerPage);
  }
  
  function toPages(pages) {
    const results = [];
  
    for (let i = 1; i < pages; i++) {
      results.push(i);
    }
  
    return results;
  }
  
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true
    },
    {
      name: "Directior",
      selector: (row) => row.director,
      sortable: true
    },
    {
      name: "Runtime (m)",
      selector: (row) => row.runtime,
      sortable: true,
      right: true
    },
    {
      button: true,
      cell: (row) => {
        console.log(row);
        return (
        <div class="button-group">
          <div class="openbtn text-center">
            <button
              type="button"
              class="btn btn-primary button-edit"
              data-bs-toggle="modal"
              data-bs-target="#edit-modal"
            >
              Cập nhật
            </button>
            <div class="modal" tabindex="-1" id="edit-modal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">edit Modal title</h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <p>Modal body text goes here.</p>
                    <p>{row.title}</p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="openbtn text-center ">
            <button
              type="button "
              class="btn btn-danger button-delete"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
            >
              Xóa
            </button>
            <div class="modal" tabindex="-1" id="delete-modal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">delete Modal title</h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <p>Modal body text goes here.</p>
                    <p>{row.title}</p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      )}
    }
  ];
  
  // RDT exposes the following internal pagination properties
  const BootyPagination = ({
    rowsPerPage,
    rowCount,
    onChangePage,
    onChangeRowsPerPage, // available but not used here
    currentPage
  }) => {
    const handleBackButtonClick = () => {
      onChangePage(currentPage - 1);
    };
  
    const handleNextButtonClick = () => {
      onChangePage(currentPage + 1);
    };
  
    const handlePageNumber = (e) => {
      onChangePage(Number(e.target.value));
    };
  
    const pages = getNumberOfPages(rowCount, rowsPerPage);
    const pageItems = toPages(pages);
    const nextDisabled = currentPage === pageItems.length;
    const previosDisabled = currentPage === 1;
  
    return (
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleBackButtonClick}
              disabled={previosDisabled}
              aria-disabled={previosDisabled}
              aria-label="previous page"
            >
              Previous
            </button>
          </li>
          {pageItems.map((page) => {
            const className =
              page === currentPage ? "page-item active" : "page-item";
  
            return (
              <li key={page} className={className}>
                <button
                  className="page-link"
                  onClick={handlePageNumber}
                  value={page}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleNextButtonClick}
              disabled={nextDisabled}
              aria-disabled={nextDisabled}
              aria-label="next page"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };
  
  const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
    <div className="form-check">
      <input
        htmlFor="booty-check"
        type="checkbox"
        className="form-check-input"
        ref={ref}
        onClick={onClick}
        {...rest}
      />
      <label className="form-check-label" id="booty-check" />
    </div>
  ));

  
const UserPage = () => {
    const [users, setUsers] = useState([])
    
    const fetchUserData = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then(response => {
            return response.json()
          })
          .then(data => {
            setUsers(data)
          })
      }
    
    useEffect(() => {
        // fetchUserData()
        console.log('hello world');
        // console.log($(this.refs.myButton));
    }, [])

    
    const handleRowChange = (state) => {
        setUsers(state.selectedRows);
        console.log(state.selectedRows);
        // onChangePage(Number(e.target.value));
        // setSelected
    };
  
      
    return (
        <>
             <Layout>

             <form class="d-flex container" role="search" style={{marginBottom: '36px'}}>
              <input class="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Tìm kiếm</button>
            </form>

             <div className="card container data-table" >
                <DataTable
                class="data-table"
                title="Movies"
                columns={columns}
                data={movies}
                defaultSortFieldID={1}
                pagination
                paginationComponent={BootyPagination}
                selectableRows
                selectableRowsComponent={BootyCheckbox}
                onSelectedRowsChange={handleRowChange}
                />
            </div>

             </Layout>
        </>   
    );
}

export default UserPage