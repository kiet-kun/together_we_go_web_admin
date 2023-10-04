import React, { useEffect, useState } from "react"
import DataTable from "react-data-table-component";
import axios from "axios";
import Layout from '../../../layouts/layout';
import "./user.css";
import movies from "./movies";
import BootyCheckbox from '../../../components/datatable_checkbox';
import BootyPagination from '../../../components/datatable_pagination';

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
    
const UserPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    
    const fetchUserData = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then(response => {
            return response.json()
          })
          .then(data => {
            // setUsers(data)
            
          })
      }

      const fetchUsers = async page => {
        setLoading(true);
    
        const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);
    
        setData(response.data.data);
        setTotalRows(response.data.total);

        setData(movies);
        setTotalRows(movies.total);

        setLoading(false);
      };
    
    useEffect(() => {
      fetchUsers(1); // fetch page 1 of users
    }, []);

    const handleRowChange = (state) => {
        // setUsers(state.selectedRows);
        console.log(state.selectedRows);
        // onChangePage(Number(e.target.value));
        // setSelected
    };

    const handlePerRowsChange = async (newPerPage, page) => {
      // setLoading(true);
  
      // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);
  
      // setData(response.data.data);
      // setPerPage(newPerPage);
      // setLoading(false);
    };
     
    return (
        <>
             <Layout>
              <div>

             <form class="d-flex container" role="search" style={{marginBottom: '36px'}}>
              <input class="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Tìm kiếm</button>
            </form>

             <div className="card container data-table" >
                <DataTable
                class="data-table"
                title="Bảng người dùng"
                progressPending={loading}
                columns={columns}
                data={data}
                defaultSortFieldID={1}
                pagination
                paginationComponent={BootyPagination}
                selectableRows
                selectableRowsComponent={BootyCheckbox}
                onSelectedRowsChange={handleRowChange}
                paginationTotalRows={totalRows}
                paginationRowsPerPageOptions={15}

                // paginationServer
        
                onChangeRowsPerPage={handlePerRowsChange}
                // onChangePage={handlePageChange}
                />
            </div>
              </div>

             </Layout>
        </>   
    );
}

export default UserPage