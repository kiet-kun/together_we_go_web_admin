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

let data = [{
  "_id": "65333fefdc108ea16cb4007f",
  "firstName": "Nguyễn Hoàng Kiệt",
  "lastName": "string",
  "email": "skill1sp2@gmail.com",
  "password": "$2a$10$R16.qdSmSs9f1SpL898iqeY2NmAel.oMjXaTm4dQfYq993z6KYpN.",
  "avatarUrl": "https://res.cloudinary.com/dxoblxypq/image/upload/v1679984586/9843c460ff72ee89d791bffe667e451c_rzalqh.jpg",
  "phoneNumber": "0961323072",
  "online": false,
  "gender": "male",
  "locationId": "",
  "locationMainText": "",
  "locationAddress": "",
  "role": "user",
  "isCalling": false,
  "__v": 0,
  "updatedAt": {
    "$date": "2024-03-14T08:48:32.047Z"
  },
  "createdAt": {
    "$date": "2023-12-20T01:01:29.742Z"
  },
  "address": {
    "level1": "",
    "level2": "",
    "level3": "",
    "level4": ""
  },
  "addressArea": {
    "afternoon": "level1",
    "morning": "level3",
    "night": "level4"
  },
  "priorityPoint": 100
}]



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
    showToast('Thành công', TOAST_TYPE.success,)
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
          <div className="card container data-table" >
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">
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
                  <th scope="col">Mã
                    {/* <i class="bi bi-sort-up" style={{width: '16px', height: '16px'}}></i> */}
                  </th>
                  <th scope="col">Tên
                    {/* <i class="bi bi-sort-up-alt" style={{width: '16px', height: '16px'}}></i> */}
                  </th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  (isLoading && datas.length == 0) && <div>Loading</div>
                }
                {datas.length > 0 && datas.map(function (object, i) {
                  // return <ObjectRow obj={object} key={i} />;
                  return <tr>
                    <th scope="row">{object.id}</th>
                    <td>{object.title}</td>
                    <td>{object.year}</td>
                    <td>{object.runtime}</td>
                    <td>{object.runtime}</td>
                    <td>
                      <div class="row justify-content-start">
                        <div class="col p-0">
                          <button type="button px-3" class="btn btn-light"
                            onClick={() => openViewModel(object)}
                          >
                            Xem
                          </button>
                        </div>
                        <div class="col p-0">
                          <button type="button" class="btn btn-light" onClick={() => openDeleteModel(object)}>
                            <i class="bi bi-trash pe-none" width="16" height="16" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
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