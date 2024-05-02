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
import { JWT, PAGE_NAME } from '@/constanst';

const BookingPage = () => {
  // Table properties
  let [totalInDB, setTotalInDB] = useState(0);
  let [page, setPage] = useState(1);
  let [pageSize, setPageSize] = useState(10);
  let [datas, setDatas] = useState([]);
  let [sortOptions, setSortOptions] = useState({});
  let [isLoading, setIsLoading] = useState(false);
  let [sortStateCreatedAt, setSortStateCreatedAt] = useState(SORT_STATE.none);
  let [sortStatePoint, setSortStatePoint] = useState(SORT_STATE.none);
  let [isShowId, setIsShowId] = useState(true);
  let [isShowStartAddress, setIsShowStartAddress] = useState(true);
  let [isShowEndAddress, setIsShowEndAddress] = useState(true);
  let [isShowTime, setIsShowTime] = useState(true);
  let [isShowPrice, setIsShowPrice] = useState(true);
  let [isShowBookingType, setIsShowBookingType] = useState(true);
  let [isShowAuthor, setIsShowAuthor] = useState(true);
  let [isShowCreatedAt, setIsShowCreatedAt] = useState(true);
  let [isShowState, setIsShowState] = useState(true);
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
        setTotalInDB(response.data.total)
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
  }, [ page, pageSize, keyword, minPrice,
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
              <li class="breadcrumb-item"><a href={"#" + PAGE_NAME.home}>Trang chủ</a></li>
              <li class="breadcrumb-item active" aria-current="page">Chuyến đi</li>
            </ol>
          </nav>

          {/* Filter */}
          <Form>
            <div class="d-flex justify-content-between py-3 ">
              <form class="d-flex" style={{ width: "300px" }} role="search">
                <input class="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search"
                  onChange={handleSearch}
                />
              </form>

              <div class="d-flex justify-content-end ">
                <div class="mx-2">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-custom-components">
                      <i class="bi bi-layout-three-columns" width="16" height="16" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu  >
                      <div className="ms-2">
                        <Form.Group>
                          <Form.Check // prettier-ignore
                            type="switch"
                            // id="custom-switch"
                            label="Id"
                            checked={isShowId}
                            onClick={(e) => setIsShowId(!isShowId)}
                          />
                        </Form.Group>

                      </div>

                      <div className="ms-2">
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          label="Điểm đi"
                          checked={isShowStartAddress}
                          onClick={(e) => setIsShowStartAddress(!isShowStartAddress)}
                        />
                      </div>
                      <div className="ms-2">
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          label="Điểm đến"
                          checked={isShowEndAddress}
                          onClick={(e) => setIsShowEndAddress(!isShowEndAddress)}
                        />
                      </div>
                      <div className="ms-2">
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          label="Thời gian bắt đầu"
                          checked={isShowTime}
                          onClick={(e) => setIsShowTime(!isShowTime)}
                        />
                      </div>
                      <div className="ms-2">
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          label="Giá"
                          checked={isShowPrice}
                          onClick={(e) => setIsShowPrice(!isShowPrice)}
                        />
                      </div>
                      <div className="ms-2">
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          label="Loại"
                          checked={isShowBookingType}
                          onClick={(e) => setIsShowBookingType(!isShowBookingType)}
                        />
                      </div>
                      <div className="ms-2">
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          label="Người tạo"
                          checked={isShowAuthor}
                          onClick={(e) => setIsShowAuthor(!isShowAuthor)}
                        />
                      </div>
                      <div className="ms-2">
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          label="Thời gian tạo"
                          checked={isShowCreatedAt}
                          onClick={(e) => setIsShowCreatedAt(!isShowCreatedAt)}
                        />
                      </div>
                      <div className="ms-2">
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          label="Trạng thái"
                          checked={isShowState}
                          onClick={(e) => setIsShowState(!isShowState)}
                        />
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>

                </div>
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

                {/* <div class="ms-2">
                  <Button variant="outline-success"><i class="bi bi-download pe-none" width="16" height="16" /> Xuất file</Button>
                </div> */}

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
                          <Button variant="light" onClick={(e) => {
                            setIsShowStatusFilter(false)
                            setStatus('')
                          }}>
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
                          <Button variant="light" onClick={(e) => {
                            setIsShowEndAddressFilter(false);
                            setEndAddress('')}}>
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
                          <Button variant="light" onClick={(e) => {
                            setIsShowStartAddressFilter(false); setStartAddress('')}}>
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
                          <Button variant="light" onClick={(e) => {
                            setIsShowBookingTypeFilter(false);
                          setBookingType('')}}>
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
                          <Button variant="light" onClick={(e) => {
                            setIsShowMinPriceFilter(false)
                            setMinPrice('')
                            }}>
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
                          <Button variant="light" onClick={(e) => {
                            setIsShowMaxPriceFilter(false)
                            setMaxPrice('')
                            }}>
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
                          <Button variant="light" onClick={(e) => {
                            setIsShowStartTimeFilter(false)
                            setStartTime('')
                            }}>
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
                          <Button variant="light" onClick={(e) => {
                            setIsShowEndTimeFilter(false);
                            setEndTime('')
                            }}>
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
            (!isLoading && datas.length > 0) &&
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
                      {
                        isShowId &&
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
                      }
                      {
                        isShowStartAddress &&
                        <th>Điểm đi</th>
                      }
                      {
                        isShowEndAddress && <th>Điểm đến</th>}
                      {
                        isShowTime && <th>Thời gian bắt đầu</th>}
                      {
                        isShowPrice && <th>Giá</th>}
                      {
                        isShowBookingType && <th>Loại</th>}
                      {
                        isShowAuthor && <th>Người tạo</th>}
                      {
                        isShowCreatedAt && <th>Thời gian tạo</th>}
                      {
                        isShowState && <th>Trạng thái</th>}
                      <th></th>

                    </tr>
                  </thead>
                  <tbody>
                    {datas.length > 0 && datas.map(function (object, i) {
                      // return <ObjectRow obj={object} key={i} />;
                      return <tr>
                        {isShowId &&
                          <th>{(object.id) ? customStr(object.id, 10) : '#'}</th>
                        }
                        {isShowStartAddress &&
                          <td>{customStr(object.startPointMainText + object.startPointAddress, 10)}</td>}
                        {isShowEndAddress &&
                          <td>{customStr(object.endPointMainText + object.endPointAddress, 10)}</td>}
                        {isShowTime && <td>{object.time}</td>}
                        {isShowPrice && <td>{object.price}</td>}
                        {isShowBookingType && <td>{object.bookingType}</td>}
                        {isShowAuthor && <td>{object.authorId.firstName}</td>}
                        {isShowCreatedAt && <td>{object.createdAt}</td>}
                        {isShowState && <td>
                          {object.status == 2 && <button type="button" class="btn btn-primary" disabled>
                            Đang mở
                          </button>}
                          {object.status == 1 && <button type="button" class="btn btn-info" disabled>
                            Hoàn thành
                          </button>}

                        </td>}
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
            (!isLoading && datas.length == 0) && <div className="card py-2 px-2">Không có dữ liệu</div>
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