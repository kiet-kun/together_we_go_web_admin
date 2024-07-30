import Layout from '@/ui/layouts/layout';
import "./home.css";
import Chart from 'chart.js/auto';
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState, useRef } from "react"
import axios from 'axios';
import mapData from './mapData';
import Table from 'react-bootstrap/Table';
import { getStatistic } from '../../../../services/statistic';
import { useSelector, useDispatch } from 'react-redux'
import { JWT } from '@/constanst'
import { notifyAfterCallApi, sleep } from '../../../../utils/utils';

// Load Highcharts modules
require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/map')(Highcharts)


// const dataLine = {
//   labels: ["02/2024", "03/2024", "04/2024", "05/2024", "06/2024", "07/2024"],
//   datasets: [
//     {
//       label: "Lượt truy cập",
//       data: [33, 53, 85, 41, 44, 65],
//       fill: true,
//       backgroundColor: "rgba(75,192,192,0.2)",
//       borderColor: "rgba(75,192,192,1)"
//     },
//   ]
// };


// const dataMap = [
//   ['vn-3655', 10], ['vn-qn', 11], ['vn-kh', 12], ['vn-tg', 13],
//   ['vn-bv', 14], ['vn-bu', 15], ['vn-hc', 16], ['vn-br', 17],
//   ['vn-st', 18], ['vn-pt', 19], ['vn-yb', 20], ['vn-hd', 21],
//   ['vn-bn', 22], ['vn-317', 23], ['vn-nb', 24], ['vn-hm', 25],
//   ['vn-ho', 26], ['vn-vc', 27], ['vn-318', 28], ['vn-bg', 29],
//   ['vn-tb', 30], ['vn-ld', 31], ['vn-bp', 32], ['vn-py', 33],
//   ['vn-bd', 34], ['vn-724', 35], ['vn-qg', 36], ['vn-331', 37],
//   ['vn-dt', 38], ['vn-la', 39], ['vn-3623', 40], ['vn-337', 41],
//   ['vn-bl', 42], ['vn-vl', 43], ['vn-tn', 44], ['vn-ty', 45],
//   ['vn-li', 46], ['vn-311', 47], ['vn-hg', 48], ['vn-nd', 49],
//   ['vn-328', 50], ['vn-na', 51], ['vn-qb', 52], ['vn-723', 53],
//   ['vn-nt', 54], ['vn-6365', 55], ['vn-299', 56], ['vn-300', 57],
//   ['vn-qt', 58], ['vn-tt', 59], ['vn-da', 60], ['vn-ag', 61],
//   ['vn-cm', 62], ['vn-tv', 63], ['vn-cb', 64], ['vn-kg', 65],
//   ['vn-lo', 66], ['vn-db', 67], ['vn-ls', 68], ['vn-th', 69],
//   ['vn-307', 70], ['vn-tq', 71], ['vn-bi', 72], ['vn-333', 73]
// ];

// const initOptions = {
//   title: {
//     text: ''
//   },
//   colorAxis: {
//     min: 0,
//     stops: [
//       [0, '#EFEFFF'],
//       [0.67, '#4444FF'],
//       [1, '#000022']
//     ]
//   },
//   tooltip: {
//     pointFormatter: function () {
//       try {
//         return this.properties['woe-label'].split(',')[0];
//       } catch (error) {
//         return ''
//       }

//     }
//   },
//   series: [{
//     mapData: mapData,
//     dataLabels: {
//       formatter: function () {
//         try {
//           return this.point.properties['woe-label'].split(',')[0];
//         } catch (error) {
//           return ''
//         }

//       }
//     },
//     // name: 'Norway',
//     data: dataMap
//   }],
//   mapNavigation: {
//     enabled: true,
//     buttonOptions: {
//       theme: {
//         r: 8, // change border radius here
//       },
//       verticalAlign: 'bottom'
//     }
//   },
// };

// const cardItems = [
//   {
//     name: "Người dùng",
//     total: 1000,
//     icon: "bi-person-fill",
//     compare: 2,
//   },
//   {
//     name: "Chuyến đang mở",
//     total: 52,
//     icon: "bi-opencollective",
//     compare: -1,
//   },
//   {
//     name: "Chuyến hoàn thành",
//     total: 500,
//     icon: "bi-check-circle-fill",
//     compare: 1,
//   },
//   {
//     name: "Lượt truy cập",
//     total: 123,
//     icon: "bi-activity",
//     compare: 12,
//   },
// ]

const getInitOptions = (dataMap) => {
  return {
    title: {
      text: ''
    },
    colorAxis: {
      min: 0,
      stops: [
        [0, '#EFEFFF'],
        [0.67, '#4444FF'],
        [1, '#000022']
      ]
    },
    tooltip: {
      pointFormatter: function () {
        try {
          return this.properties['woe-label'].split(',')[0];
        } catch (error) {
          return ''
        }

      }
    },
    series: [{
      mapData: mapData,
      dataLabels: {
        formatter: function () {
          try {
            return this.point.properties['woe-label'].split(',')[0];
          } catch (error) {
            return ''
          }

        }
      },
      // name: 'Norway',
      data: dataMap
    }],
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        theme: {
          r: 8, // change border radius here
        },
        verticalAlign: 'bottom'
      }
    },
  };
}



const HomePage = () => {
  let [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef(null);
  const [cardItems, setCardItems] = useState([]);
  const [dataLine, setDataLine] = useState(null);
  const [dataMap, setDataMap] = useState([]);
  const [initOptions, setInitOptions] = useState({});

  const [onlineRanks, setOnlineRanks] = useState([]);

  const user = useSelector((state) => state.authentication.user)

  const loadData = async () => {
    try {
      setIsLoading(true);

      const response = await getStatistic(user[JWT.ACCESS_TOKEN]);
      notifyAfterCallApi(response);

      if (response.status == 200) {
        // console.log(response.data.data);
        setCardItems([{
          name: "Người dùng",
          total: response.data.data.total.user,
          icon: "bi-person-fill",
          compare: response.data.data.compare.user,
        },
        {
          name: "Chuyến đang mở",
          total: response.data.data.total.booking_available,
          icon: "bi-opencollective",
          compare: response.data.data.compare.booking_available,
        },
        {
          name: "Chuyến hoàn thành",
          total: response.data.data.total.booking_complete,
          icon: "bi-check-circle-fill",
          compare: response.data.data.compare.booking_complete,
        },
        {
          name: "Lượt truy cập",
          total: response.data.data.total.online,
          icon: "bi-activity",
          compare: response.data.data.compare.online,
        },])

        console.log( response.data.data.lineChartOnline.map(value => value.lable))

        let _lables = response.data.data.lineChartOnline.map(value => value.lable);
        let _data = response.data.data.lineChartOnline.map(value => Number(value.value));
        setDataLine({
          labels: _lables,
          datasets: [
            {
              label: "Lượt truy cập",
              data: _data,
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)"
            },
            // {
            //   label: "Second dataset",
            //   data: [33, 25, 35, 51, 54, 76],
            //   fill: false,
            //   borderColor: "#742774"
            // }
          ]
        })

        
        let dataMap = response.data.data.mapChartOnline.map((value) => {
          return [value["hc-key"], Number(value["value"])];
        })
        console.log(dataMap.length)
        setDataMap(dataMap)
        
        let rank = response.data.data.mapChartOnline
        .sort(function(a, b){return a.value - b.value})
        .slice(0, 5).map(value => value['alt-name'])

        setOnlineRanks(rank);

        if (chartRef && chartRef.current) {
          chartRef.current.chart.series[0].update({
            mapData,
          });
        }
      }

   
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  const getCurrentMonth = () => {
    let str = new Date().toLocaleString();
    return str.split('/')[1];
  }

  return (
    <>
      <Layout>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Trang chủ</li>
          </ol>
        </nav>

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
          {
            cardItems.map((item, i) => (
              <div className="col">
                <div className='card'>
                  <div className="d-flex flex-column align-items-center justify-content-between">
                    <div className='card my-2 bg-light'>
                      <i class={`bi ${item.icon} pe-none px-2 fs-1 text-primary`} width="24" height="24"></i>
                    </div>

                    <div className='pb-2'>
                      <h6 className='text-center '>{item.name}</h6>
                      <h6 className='text-center fs-4 fw-bold'>{item.total}</h6>
                      {
                        (item.compare >= 0)
                        && <p className='text-center fw-bold text-success'>+ {item.compare.toFixed(2)}%</p>
                      }
                      {
                        (item.compare <= 0)
                        && <p className='text-center fw-bold text-danger'>{item.compare.toFixed(2)}%</p>
                      }

                      <p className='text-center '>Kể từ tháng trước</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <div class="row row-cols-1 row-cols-lg-2 g-3 py-5">
          <div class="col col-lg-6">
            <div class="card container py-4">
              <h5>Top tỉnh thành có lượt truy cập cao trong tháng 07/2024</h5>
              {
                (dataMap.length > 0) && <div class="">
                  <HighchartsReact
                    options={getInitOptions(dataMap)}
                    highcharts={Highcharts}
                    constructorType={'mapChart'}
                    ref={chartRef}
                  />
                </div>
              }

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tỉnh</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    onlineRanks.map((value, index) => (
                      <tr>
                      <td>{index + 1}</td>
                      <td>{(value) ? value : "NAME?"}</td>
                    </tr>
                    ))
                  }
                 
                  {/* <tr>
                    <td>2</td>
                    <td>Bình Dương</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Cần Thơ</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Đà Nẳng</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Hà Nội</td>
                  </tr> */}
                </tbody>
              </Table>
            </div>
          </div>
          <div class="col col-lg-6">
            <div class="card container py-4">
              <h5 className='pb-3'>Thống kê lượt truy cập</h5>
              {
                (dataLine) && <Line data={dataLine} />
              }
              
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default HomePage
