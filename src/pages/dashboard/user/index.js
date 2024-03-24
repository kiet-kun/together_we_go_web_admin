import React, { useEffect, useState } from "react"
import axios from "axios";
import Layout from '../../../layouts/layout';
import "./user.css";
import movies from "./movies";
import MyPagination from '../../../components/datatable_pagination';
import { SORT_STATE, TOAST_TYPE } from "../../../constanst";
import ViewModal from "./modal/view_modal";
import DeleteModal from "./modal/delete_modal";
import AddModal from "./modal/add_modal";
import { nextSortState, sleep } from "../../../utils/utils";
import { getUsers } from "../../../services/user_service";
import { Table } from "react-bootstrap";
const UserPage = ({ showToast }) => {
  // Table properties
  let [totalInDB, setTotalInDB] = useState(movies.length);
  let [page, setPage] = useState(1);
  let [pageSize, setPageSize] = useState(10);
  let [datas, setDatas] = useState([]);
  let [sortOptions, setSortOptions] = useState({});
  let [isLoading, setIsLoading] = useState(false);
  let [keyword, setKeyword] = useState('');
  let [sortStateCreatedAt, setSortStateCreatedAt] = useState(SORT_STATE.none);
  let [sortStatePoint, setSortStatePoint] = useState(SORT_STATE.none);
  // Modal properties
  let [isViewModalOpen, setViewModalOpen] = useState(false);
  let [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  let [isAddModalOpen, setAddModalOpen] = useState(false);
  let [itemFoucus, setItemFocus] = useState(null);

  async function loadPage() {
    console.log(page, pageSize);
    setIsLoading(true);
    let end = page * pageSize - 1;
    let start = (page - 1) * pageSize;

    setDatas(movies.slice(start, end));
    await sleep(2 * 1000);

    let response = await getUsers(page, pageSize);
    console.log(response);
    if (response.status == 200) {
      setDatas(response.data.data)
      showToast('Thành công', TOAST_TYPE.success)
    }
    else {
      showToast('Lỗi', TOAST_TYPE.danger)
    }
    setIsLoading(false);
  }

  function openViewModel(item) {
    console.log('view', item)
    setItemFocus(item);
    itemFoucus = item;
    setViewModalOpen(true);
  }

  function openDeleteModel(item) {
    setItemFocus(item);
    itemFoucus = item;
    setDeleteModalOpen(true);
  }

  function openAddModel() {
    setAddModalOpen(true);
  }

  const handleClose = () => {
    setViewModalOpen(false);
    setDeleteModalOpen(false);
    setAddModalOpen(false);
  }

  const handleSearch = (event) => setKeyword(event.target.value);

  const handleClickSortCreatedAt = (event) => {
    let value = nextSortState(sortStateCreatedAt);
    setSortStateCreatedAt(value);
  }

  useEffect(() => {
    loadPage();
  }, [totalInDB, page, pageSize, sortStateCreatedAt]);

  return (
    <>
      <Layout>
        <div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
              <li class="breadcrumb-item active" aria-current="page">Người dùng</li>
            </ol>
          </nav>

          <form class="d-flex container" role="search" style={{ marginBottom: '12px', padding: '0' }}>
            <input class="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search"
              onChange={handleSearch}
            />
            <button class="btn btn-outline-success" type="submit" onSubmit={() => loadPage()}>Tìm kiếm</button>
          </form>

          <div class="d-flex justify-content-end" style={{ marginBottom: '12px' }}>
            <button type="button px-5" class="btn btn-success" style={{ width: '72px' }} onClick={() => openAddModel()}>
              <i class="bi bi-plus-square pe-none" width="16" height="16" />
            </button>
          </div>

          <MyPagination
            totalInDB={totalInDB} page={page} pageSize={pageSize} isLoading={isLoading}
            setPage={setPage} loadPage={loadPage}
            setPageSize={setPageSize}
          ></MyPagination>

          {/* Table */}

          <div className="card container data-table" 
          // style={{width: '300px'}}
          >
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <div class="d-inline">ID</div>
                    <div class="d-inline" onClick={handleClickSortCreatedAt}>
                      {sortStateCreatedAt == SORT_STATE.increasing &&

                        <i class="bi bi-sort-up" style={{ width: '16px', height: '16px' }}></i>


                      }
                      {sortStateCreatedAt == SORT_STATE.decreasing &&
                        <i class="bi bi-sort-up-alt" style={{ width: '16px', height: '16px' }}></i>
                      }
                      {sortStateCreatedAt == SORT_STATE.none &&
                        <i class="bi bi-funnel" style={{ width: '16px', height: '16px' }}></i>
                      }
                    </div>



                  </th>
                  <th >Mã
                    {/* <i class="bi bi-sort-up" style={{width: '16px', height: '16px'}}></i> */}
                  </th>
                  <th >Tên
                    {/* <i class="bi bi-sort-up-alt" style={{width: '16px', height: '16px'}}></i> */}
                  </th>
                  <th>Trạng thái</th>
                  <th >Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  (isLoading && datas.length == 0) && <div>Loading</div>
                }
                {datas.length > 0 && datas.map(function (object, i) {
                  // return <ObjectRow obj={object} key={i} />;
                  return <tr>
                    <th >{object.id}</th>
                    <td>{object.id}</td>
                    <td>{object.id}</td>
                    <td>{object.id}</td>
                    <td>{object.id}</td>
                    <td class="">
                      <div class="d-flex justify-content-start">
                        <div class="">
                          <button type="button px-3" class="btn btn-light"
                            onClick={() => openViewModel(object)}
                          >
                            Xem
                          </button>
                        </div>
                        <div class="">
                          <button type="button" class="btn btn-light" onClick={() => openDeleteModel(object)}>
                            <i class="bi bi-trash pe-none" width="16" height="16" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                })}
              </tbody>
            </Table>
          </div>


          <div class="pt-3"></div>

          <MyPagination
            totalInDB={totalInDB} page={page} pageSize={pageSize} isLoading={isLoading}
            setPage={setPage} loadPage={loadPage}
            setPageSize={setPageSize}
          ></MyPagination>

          {/* Modal */}
          {
            isViewModalOpen && <ViewModal show={isViewModalOpen} data={itemFoucus} handleClose={handleClose}></ViewModal>
          }
          {
            isDeleteModalOpen && <DeleteModal show={isDeleteModalOpen} data={itemFoucus} handleClose={handleClose}></DeleteModal>
          }
          {
            isAddModalOpen && <AddModal show={isAddModalOpen} data={itemFoucus} handleClose={handleClose}></AddModal>
          }

        </div>
      </Layout>
    </>
  );
}

export default UserPage