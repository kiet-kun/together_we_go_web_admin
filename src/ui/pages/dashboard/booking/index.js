// lib
import React, { useEffect, useState } from "react"
import { Table, Collapse, Button, Form, Row, Col } from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// component
import Layout from '@/ui/layouts/layout';
import MyPagination from '@/ui/components/datatable_pagination';
// modal
import ViewModal from "./modal/view_modal";
import DeleteModal from "./modal/delete_modal";
import AddModal from "./modal/add_modal";
// logic
import { SORT_STATE, } from "@/constanst";
import { nextSortState, sleep, customStr } from "@/utils/utils";
import { getBookings } from "@/services/booking_service";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { JWT } from '@/constanst';

const BookingPage = () => {
  // Table properties
  let [totalInDB, setTotalInDB] = useState(200);
  let [page, setPage] = useState(1);
  let [pageSize, setPageSize] = useState(10);
  let [datas, setDatas] = useState([]);
  let [sortOptions, setSortOptions] = useState({});
  let [isLoading, setIsLoading] = useState(false);
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

  const [keyword, setKeyword] = useState('');

  const [authorId, setAuthorId] = useState('');

  const [minPrice, setMinPrice] = useState('');
  const [isShowMinPriceFilter, setIsShowMinPriceFilter] = useState(false);

  const [maxPrice, setMaxPrice] = useState('');
  const [isShowMaxPriceFilter, setIsShowMaxPriceFilter] = useState(false);

  const [status, setStatus] = useState('');
  const [isShowStatusFilter, setIsShowStatusFilter] = useState(false);

  const [bookingType, setBookingType] = useState('');
  const [isShowBookingTypeFilter, setIsShowBookingTypeFilter] = useState(false);

  const [startAddress, setStartAddress] = useState('');
  const [isShowStartAddressFilter, setIsShowStartAddressFilter] = useState(false);

  const [endAddress, setEndAddress] = useState('');
  const [isShowEndAddressFilter, setIsShowEndAddressFilter] = useState(false);

  const [startTime, setStartTime] = useState('');
  const [isShowStartTimeFilter, setIsShowStartTimeFilter] = useState(false);

  const [endTime, setEndTime] = useState('');
  const [isShowEndTimeFilter, setIsShowEndTimeFilter] = useState(false);


  const user = useSelector((state) => state.authentication.user)

  async function loadPage() {
    try {
      console.log(page, pageSize, keyword);
      setIsLoading(true);
      let response = await getBookings(page, pageSize, {
        keyword, authorId,
        minPrice, maxPrice,
        status, bookingType,
        startAddress, endAddress,
        startTime, endTime,
      }, user[JWT.ACCESS_TOKEN]);
      console.log(response);
      if (response.status == 200) {
        setDatas(response.data.data)
        // showToast('Thành công', .success)
      }
      else {
        toast.error('Lỗi')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);

    }
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
  }, [totalInDB, page, pageSize, keyword, minPrice,
    maxPrice,
    status,
    bookingType,
    startAddress,
    endAddress,
    startTime,
    endTime,]);


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

          {/* Filter */}
          <Form>

            {/* <Collapse in={isOpenFilter}>
              <div id="example-collapse-text">
                <Form>

                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Thời gian bắt đầu:</Form.Label>
                    <DateTimePicker onChange={setStartTime} value={startTime} />
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Thời gian kết thúc:</Form.Label>
               
                  <DateTimePicker onChange={setEndTime} value={endTime} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Select aria-label="Default select example"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="2">Đang mở</option>
                      <option value="1">Đã hoàn thành</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Giá nhỏ nhất</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Giá"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </Form.Group>


                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Giá lớn nhất</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Giá"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Loại</Form.Label>
                    <Form.Select aria-label="Default select example"
                    value={bookingType}
                    onChange={(e) => setBookingType(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Tìm tài xế">Tìm tài xế</option>
                      <option value="Tìm hành khách">Tìm hành khách</option>
                    </Form.Select>
                  </Form.Group>


                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom09">
                    <Form.Label>Địa điểm đi</Form.Label>
                    <Form.Control as="textarea" rows={1}
                    value={startAddress}
                    onChange={(e) => setStartAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom09">
                    <Form.Label>Địa điểm đến</Form.Label>
                    <Form.Control as="textarea" rows={1}
                    value={endAddress}
                    onChange={(e) => setEndAddress(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationCustom09">
                    <Form.Label>ID người đăng</Form.Label>
                    <Form.Control type="text"
                      value={authorId}
                      onChange={(e) => setAuthorId(e.target.value)}
                    />
                  </Form.Group>
                </Row>

              </Form>

                <Button onClick={(e) => loadPage()}>Tìm kiếm</Button>
              </div>
            </Collapse> */}

            <div class="d-flex justify-content-between py-3 ">
              <form class="d-flex" style={{ width: "300px" }} role="search">
                <input class="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search"
                  onChange={handleSearch}
                />
                {/* <button class="btn btn-outline-success"  onSubmit={() => loadPage()}>Tìm kiếm</button> */}


                {/* <Button
                onClick={() => setIsOpenFilter(!isOpenFilter)}
                aria-controls="example-collapse-text"

                aria-expanded={isOpenFilter}
              >
                <i class="bi bi-filter pe-none" width="16" height="16" />
              </Button> */}
              </form>

              <div class="d-flex justify-content-end ">
                {
                  (!isShowMinPriceFilter ||
                    !isShowMaxPriceFilter ||
                    !isShowStatusFilter ||
                    !isShowBookingTypeFilter ||
                    !isShowStartAddressFilter ||
                    !isShowEndAddressFilter ||
                    !isShowStartTimeFilter ||
                    !isShowEndTimeFilter) &&
                  <div class="mx-2">

                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-custom-components">
                        Thêm bộ lọc
                      </Dropdown.Toggle>

                      <Dropdown.Menu  >
                        {
                          !isShowStatusFilter &&
                          <Dropdown.Item eventKey="1" onClick={(e) => setIsShowStatusFilter(true)}>
                            Trạng thái</Dropdown.Item>
                        }
                        {
                          !isShowBookingTypeFilter &&
                          <Dropdown.Item eventKey="1" onClick={(e) => setIsShowBookingTypeFilter(true)}>
                            Loại</Dropdown.Item>
                        }
                        {
                          !isShowMinPriceFilter &&
                          <Dropdown.Item eventKey="1" onClick={(e) => setIsShowMinPriceFilter(true)}>
                            Giá tối thiểu</Dropdown.Item>
                        }
                        {
                          !isShowMaxPriceFilter &&
                          <Dropdown.Item eventKey="1" onClick={(e) => setIsShowMaxPriceFilter(true)}>
                            Giá tối đa</Dropdown.Item>
                        }
                        {
                          !isShowStartAddressFilter &&
                          <Dropdown.Item eventKey="1" onClick={(e) => setIsShowStartAddressFilter(true)}>
                            Địa điểm đi</Dropdown.Item>
                        }
                        {
                          !isShowEndAddressFilter &&
                          <Dropdown.Item eventKey="1" onClick={(e) => setIsShowEndAddressFilter(true)}>
                            Địa điểm đến</Dropdown.Item>
                        }
                        {
                          !isShowStartTimeFilter &&
                          <Dropdown.Item eventKey="1" onClick={(e) => setIsShowStartTimeFilter(true)}>
                            Thời gian bắt đầu</Dropdown.Item>
                        }
                        {
                          !isShowEndTimeFilter &&
                          <Dropdown.Item eventKey="1" onClick={(e) => setIsShowEndTimeFilter(true)}>
                            Thời gian kết thúc</Dropdown.Item>
                        }

                      </Dropdown.Menu>
                    </Dropdown>

                  </div>
                }
                <div class="mx-2">
                  <Button variant="outline-success" onClick={() => openAddModel()}><i class="bi bi-plus pe-none" width="16" height="16" /> Thêm mới</Button>
                </div>

                <div class="ms-2">
                  <Button variant="outline-success"><i class="bi bi-download pe-none" width="16" height="16" /> Xuất file</Button>
                </div>



                {/* <button type="button px-5" class="btn btn-success" style={{ width: '72px' }} >
                  <i class="bi bi-plus-square pe-none" width="16" height="16" />
                </button> */}
              </div>
            </div>

            <div class="d-flex  align-items-center flex-wrap">

              <Collapse in={isShowStatusFilter}>
                <div class="row">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">

                      <Form.Label>
                        <div class="d-flex align-items-center ">
                          <div class="me-2">Trạng thái   </div>
                          <Button variant="light" onClick={(e) => setIsShowStatusFilter(false)}>
                            <i class="bi bi-dash-circle pe-none" width="16" height="16" />
                          </Button>
                        </div>
                      </Form.Label>
                      <Form.Select aria-label="Default select example"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="2">Đang mở</option>
                        <option value="1">Đã hoàn thành</option>
                      </Form.Select>

                    </Form.Group>
                  </Row>
                </div>
              </Collapse>

              {
                isShowStatusFilter && <div className="p-4"></div>
              }


              <Collapse in={isShowEndAddressFilter}>
                <div class="row">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">

                      <Form.Label>
                        <div class="d-flex align-items-center ">
                          <div class="me-2">Địa điểm đến</div>
                          <Button variant="light" onClick={(e) => setIsShowEndAddressFilter(false)}>
                            <i class="bi bi-dash-circle pe-none" width="16" height="16" />
                          </Button>
                        </div>
                      </Form.Label>
                      <Form.Control as="textarea" rows={1}
                        value={endAddress}
                        onChange={(e) => setEndAddress(e.target.value)}
                      />

                    </Form.Group>
                  </Row>
                </div>
              </Collapse>

              {
                isShowEndAddressFilter && <div className="p-4"></div>
              }

              <Collapse in={isShowStartAddressFilter}>
                <div class="row">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">

                      <Form.Label>
                        <div class="d-flex align-items-center ">
                          <div class="me-2">Địa điểm đi</div>
                          <Button variant="light" onClick={(e) => setIsShowStartAddressFilter(false)}>
                            <i class="bi bi-dash-circle pe-none" width="16" height="16" />
                          </Button>
                        </div>
                      </Form.Label>
                      <Form.Control as="textarea" rows={1}
                        value={startAddress}
                        onChange={(e) => setStartAddress(e.target.value)}
                      />

                    </Form.Group>
                  </Row>
                </div>
              </Collapse>

              {
                isShowStartAddressFilter && <div className="p-4"></div>
              }

              <Collapse in={isShowBookingTypeFilter}>
                <div class="row">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">

                      <Form.Label>
                        <div class="d-flex align-items-center ">
                          <div class="me-2">Loại</div>
                          <Button variant="light" onClick={(e) => setIsShowBookingTypeFilter(false)}>
                            <i class="bi bi-dash-circle pe-none" width="16" height="16" />
                          </Button>
                        </div>
                      </Form.Label>
                      <Form.Select aria-label="Default select example"
                        value={bookingType}
                        onChange={(e) => setBookingType(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="Tìm tài xế">Tìm tài xế</option>
                        <option value="Tìm hành khách">Tìm hành khách</option>
                      </Form.Select>

                    </Form.Group>
                  </Row>
                </div>
              </Collapse>

              {
                isShowBookingTypeFilter && <div className="p-4"></div>
              }


              <Collapse in={isShowMinPriceFilter}>
                <div class="row">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">

                      <Form.Label>
                        <div class="d-flex align-items-center ">
                          <div class="me-2">Giá tối thiểu</div>
                          <Button variant="light" onClick={(e) => setIsShowMinPriceFilter(false)}>
                            <i class="bi bi-dash-circle pe-none" width="16" height="16" />
                          </Button>
                        </div>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Giá"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />

                    </Form.Group>
                  </Row>
                </div>
              </Collapse>

              {
                isShowMinPriceFilter && <div className="p-4"></div>
              }

              <Collapse in={isShowMaxPriceFilter}>
                <div class="row">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">

                      <Form.Label>
                        <div class="d-flex align-items-center ">
                          <div class="me-2">Giá tối đa</div>
                          <Button variant="light" onClick={(e) => setIsShowMaxPriceFilter(false)}>
                            <i class="bi bi-dash-circle pe-none" width="16" height="16" />
                          </Button>
                        </div>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Giá"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />

                    </Form.Group>
                  </Row>
                </div>
              </Collapse>

              {
                isShowMaxPriceFilter && <div className="p-4"></div>
              }

              <Collapse in={isShowStartTimeFilter}>
                <div class="row">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">

                      <Form.Label>
                        <div class="d-flex align-items-center ">
                          <div class="me-2">Thời gian bắt đầu</div>
                          <Button variant="light" onClick={(e) => setIsShowStartTimeFilter(false)}>
                            <i class="bi bi-dash-circle pe-none" width="16" height="16" />
                          </Button>
                        </div>
                      </Form.Label>
                      {/* <DateTimePicker onChange={setStartTime} value={startTime} /> */}
                      <Form.Control
                        required
                        type="date"
                        placeholder=""
                        onChange={(e) => setStartTime(e.target.value)} value={startTime}

                      />
                    </Form.Group>
                  </Row>
                </div>
              </Collapse>

              {
                isShowStartTimeFilter && <div className="p-4"></div>
              }

              <Collapse in={isShowEndTimeFilter}>
                <div class="row">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">

                      <Form.Label>
                        <div class="d-flex align-items-center ">
                          <div class="me-2">Thời gian kết thúc</div>
                          <Button variant="light" onClick={(e) => setIsShowEndTimeFilter(false)}>
                            <i class="bi bi-dash-circle pe-none" width="16" height="16" />
                          </Button>
                        </div>
                      </Form.Label>
                      {/* <DateTimePicker onChange={setEndTime} value={endTime} /> */}
                      <Form.Control
                        required
                        type="date"
                        placeholder=""
                        onChange={(e) => setEndTime(e.target.value)} value={endTime}

                      />
                    </Form.Group>
                  </Row>
                </div>
              </Collapse>

              {
                isShowEndTimeFilter && <div className="p-4"></div>
              }
            </div>

          </Form>

          {
            (!isLoading  && datas.length > 0) &&
            <>
              <MyPagination
                totalInDB={totalInDB} page={page} pageSize={pageSize} isLoading={isLoading}
                setPage={setPage} loadPage={loadPage}
                setPageSize={setPageSize}
              ></MyPagination>

              {/* Table */}

              <div className="card data-table"
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
                    {datas.length > 0 && datas.map(function (object, i) {
                      // return <ObjectRow obj={object} key={i} />;
                      return <tr>
                        <th>{(object.id) ? customStr(object.id, 10) : '#'}</th>
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
              ></MyPagination></>
          }

          {
            (datas.length == 0) && <div className="card py-2 px-2">Không có dữ liệu</div>
          }

          {
            (isLoading) && <div className="card py-2 px-2">Loading</div>
          }


          {/* Modal */}
          {
            isViewModalOpen && <ViewModal
              show={isViewModalOpen} data={itemFoucus} handleClose={handleClose}
              loadPage={loadPage}
            ></ViewModal>
          }
          {
            isDeleteModalOpen && <DeleteModal show={isDeleteModalOpen} data={itemFoucus}
              handleClose={handleClose}
              loadPage={loadPage}></DeleteModal>
          }
          {
            isAddModalOpen && <AddModal show={isAddModalOpen} data={itemFoucus}
              handleClose={handleClose}
              loadPage={loadPage}></AddModal>
          }
        </div>
      </Layout>
    </>
  );
}

export default BookingPage