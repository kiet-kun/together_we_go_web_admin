// lib
import React, { useEffect, useState } from "react"
import { Table, Collapse, Button, Form, Row, Col } from "react-bootstrap";
// component
import Layout from '../../../layouts/layout';
import MyPagination from '../../../components/datatable_pagination';
// modal
import ViewModal from "./modal/view_modal";
import DeleteModal from "./modal/delete_modal";
import AddModal from "./modal/add_modal";
// logic
import { SORT_STATE, TOAST_TYPE } from "../../../../constanst";
import { nextSortState, sleep, customStr } from "../../../../utils/utils";
import { getBookings } from "../../../../services/booking_service";

const BookingPage = ({ appState }) => {
  // Table properties
  let [totalInDB, setTotalInDB] = useState(200);
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
  let [isBlockModalOpen, setBlockModalOpen] = useState(false);
  let [itemFoucus, setItemFocus] = useState(null);
  // filter
  const [isOpenFilter, setIsOpenFilter] = useState(false);


  async function loadPage() {
    console.log(page, pageSize, keyword);
    setIsLoading(true);
    let end = page * pageSize - 1;
    let start = (page - 1) * pageSize;

    let response = await getBookings(page, pageSize);
    console.log(response);
    if (response.status == 200) {
      setDatas(response.data.data)
      // showToast('Thành công', TOAST_TYPE.success)
    }
    else {
      appState.showToast('Lỗi', TOAST_TYPE.danger)
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

  const openAddModel = () => setAddModalOpen(true);
  const openBlockModel = (item) => {
    setItemFocus(item);
    itemFoucus = item;
    setBlockModalOpen(true);
  }

  const handleClose = () => {
    setViewModalOpen(false);
    setDeleteModalOpen(false);
    setAddModalOpen(false);
    setBlockModalOpen(false);
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setKeyword(event.target.value);
  };

  const handleClickSortCreatedAt = (event) => {
    let value = nextSortState(sortStateCreatedAt);
    setSortStateCreatedAt(value);
  }

  useEffect(() => {
    loadPage();
  }, [totalInDB, page, pageSize, sortStateCreatedAt, keyword]);

  return (
    <>
      <Layout>
        <div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
              <li class="breadcrumb-item active" aria-current="page">Chuyến đi</li>
            </ol>
          </nav>

          <form class="d-flex container" role="search" style={{ marginBottom: '12px', padding: '0' }}>
            <input class="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search"
              onChange={handleSearch}
            />
            {/* <button class="btn btn-outline-success"  onSubmit={() => loadPage()}>Tìm kiếm</button> */}


            <Button
              onClick={() => setIsOpenFilter(!isOpenFilter)}
              aria-controls="example-collapse-text"

              aria-expanded={isOpenFilter}
            >
              <i class="bi bi-filter pe-none" width="16" height="16" />
            </Button>
          </form>
          
          {/* Filter */}
          <Collapse in={isOpenFilter}>
            <div id="example-collapse-text">
              <Form>

                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom07">
                    <Form.Label>Thời gian bắt đầu</Form.Label>
                    <Form.Control

                      type="text"
                      placeholder="Thời gian bắt đầu"
                      // value={formatDateWithTime(time)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationCustom07">
                    <Form.Label>Thời gian kết thúc</Form.Label>
                    <Form.Control

                      type="text"
                      placeholder="Thời gian bắt đầu"
                      // value={formatDateWithTime(time)}
                    />
                  </Form.Group>


                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Giá nhỏ nhất</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Giá"
                      // value={price}
                      // onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>

                  
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Giá lớn nhất</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Giá"
                      // value={price}
                      // onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Loại</Form.Label>
                    <Form.Select aria-label="Default select example"
                      // value={bookingType}
                      // onChange={(e) => setBookingType(e.target.value)}
                      >
                      <option value="Tìm tài xế">Tìm tài xế</option>
                      <option value="Tìm hành khách">Tìm hành khách</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Select aria-label="Default select example"
                      // value={status}
                      // onChange={(e) => setStatus(e.target.value)}
                      >
                      <option value="2">Đang mở</option>
                      <option value="1">Đã hoàn thành</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom09">
                    <Form.Label>Địa điểm đi</Form.Label>
                    <Form.Control as="textarea" rows={1} 
                    // value={startPointAddress}
                      // onChange={(e) => setStartPointAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom09">
                    <Form.Label>Địa điểm đến</Form.Label>
                    <Form.Control as="textarea" rows={1} 
                    // value={endPointAddress}
                      // onChange={(e) => setEndPointAddress(e.target.value)}
                    />
                  </Form.Group>
                </Row>

              </Form>
            </div>
          </Collapse>

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
                  <th>Điểm đi</th>
                  <th>Điểm đến</th>
                  <th>Thời gian bắt đầu</th>
                  <th>Giá</th>
                  <th>Loại</th>
                  <th>Người tạo</th>
                  <th>Thời gian tạo</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  (isLoading && datas.length == 0) && <div>Loading</div>
                }
                {
                  (datas.length == 0) && <div>Không có dữ liệu</div>
                }
                {datas.length > 0 && datas.map(function (object, i) {
                  // return <ObjectRow obj={object} key={i} />;
                  return <tr>
                    <th>{customStr(object.id, 10)}</th>
                    <td>{customStr(object.startPointMainText + object.startPointAddress, 10)}</td>
                    <td>{customStr(object.endPointMainText + object.endPointAddress, 10)}</td>
                    <td>{object.time}</td>
                    <td>{object.price}</td>
                    <td>{object.bookingType}</td>
                    <td>{object.authorId.firstName}</td>
                    <td>{object.createdAt}</td>
                    <td>
                      {object.status == 2 && <button type="button" class="btn btn-primary" disabled>
                        Đang mở
                      </button>}
                      {object.status == 1 && <button type="button" class="btn btn-info" disabled>
                        Hoàn thành
                      </button>}
                    </td>
                    <td class="">
                      <div class="d-flex justify-content-start">
                        <div class="">
                          <button type="button" class="btn btn-light"
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
            appState={appState}
          ></MyPagination>

          {/* Modal */}
          {
            isViewModalOpen && <ViewModal
              show={isViewModalOpen} data={itemFoucus} handleClose={handleClose}
              loadPage={loadPage}
              appState={appState}
            ></ViewModal>
          }
          {
            isDeleteModalOpen && <DeleteModal show={isDeleteModalOpen} data={itemFoucus}
              handleClose={handleClose}
              appState={appState}
              loadPage={loadPage}></DeleteModal>
          }
          {
            isAddModalOpen && <AddModal show={isAddModalOpen} data={itemFoucus}
              handleClose={handleClose}
              appState={appState}
              loadPage={loadPage}></AddModal>
          }
        </div>
      </Layout>
    </>
  );
}

export default BookingPage