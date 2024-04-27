import Layout from '@/ui/layouts/layout';
import "./home.css";
import Chart from 'chart.js/auto';
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState , useRef} from "react"
import axios from 'axios';
import mapData from './mapData';

// Load Highcharts modules
require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/map')(Highcharts)

const optionMaps = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'My chart'
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6]
    }
  ]
};

const dataLine = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
    }
  ]
};


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: ['1', '2', '3', '4', '5', '6', '7'],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: ['1', '2', '3', '4', '5', '6', '7'],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const dataDoughnut = {
  labels: ['Sáng', 'Trưa', 'Chiều', 'Tối',],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        // 'rgba(153, 102, 255, 1)',
        // 'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const dataMap = [
  ['vn-3655', 10], ['vn-qn', 11], ['vn-kh', 12], ['vn-tg', 13],
  ['vn-bv', 14], ['vn-bu', 15], ['vn-hc', 16], ['vn-br', 17],
  ['vn-st', 18], ['vn-pt', 19], ['vn-yb', 20], ['vn-hd', 21],
  ['vn-bn', 22], ['vn-317', 23], ['vn-nb', 24], ['vn-hm', 25],
  ['vn-ho', 26], ['vn-vc', 27], ['vn-318', 28], ['vn-bg', 29],
  ['vn-tb', 30], ['vn-ld', 31], ['vn-bp', 32], ['vn-py', 33],
  ['vn-bd', 34], ['vn-724', 35], ['vn-qg', 36], ['vn-331', 37],
  ['vn-dt', 38], ['vn-la', 39], ['vn-3623', 40], ['vn-337', 41],
  ['vn-bl', 42], ['vn-vl', 43], ['vn-tn', 44], ['vn-ty', 45],
  ['vn-li', 46], ['vn-311', 47], ['vn-hg', 48], ['vn-nd', 49],
  ['vn-328', 50], ['vn-na', 51], ['vn-qb', 52], ['vn-723', 53],
  ['vn-nt', 54], ['vn-6365', 55], ['vn-299', 56], ['vn-300', 57],
  ['vn-qt', 58], ['vn-tt', 59], ['vn-da', 60], ['vn-ag', 61],
  ['vn-cm', 62], ['vn-tv', 63], ['vn-cb', 64], ['vn-kg', 65],
  ['vn-lo', 66], ['vn-db', 67], ['vn-ls', 68], ['vn-th', 69],
  ['vn-307', 70], ['vn-tq', 71], ['vn-bi', 72], ['vn-333', 73]
];

const initOptions = {
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
    pointFormatter: function() {
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
      formatter: function() {
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

const HomePage = () => {
  let [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef(null);
  // let [, setTopology] = useState({});

  useEffect( () => {
    // setIsLoading(true);
    // // let data = await axios.get('https://code.highcharts.com/mapdata/countries/vn/vn-all.topo.json');
    // // setTopology(data);
    // setIsLoading(false);
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData,
      });
    }
  }, []);


  return (
    <>
      <Layout>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Trang chủ</li>
          </ol>
        </nav>
        {/* <p style={{textAlign : 'center', marginBottom: '16px'}}>Thành viên phát triển</p>
                <div style={{display: 'flex', justifyContent : 'space-around', height : '40vh'}}>
                    <div class="card my-card">
                    <img src="/assets/image/developer.jpg" class="card-img-top image" alt="..."/>
                    <div class="card-body" style={{minWidth : '220px'}}>
                        <h5 class="card-title" style={{textAlign : 'center'}}>Lê Minh Quân</h5>
                        <p class="card-text" style={{textAlign : 'center'}}>Frontend developer</p>
                        <div>
                            <a href="#" class="btn btn-primary" style={{width: '100%'}}>Đến Github</a>
                        </div>
                    </div>
                    </div>

                    <div class="card my-card">
                    <img src="/assets/image/developer.jpg" class="card-img-top image" alt="..."/>
                    <div class="card-body" style={{minWidth : '220px'}}>
                        <h5 class="card-title" style={{textAlign : 'center'}}>Nguyễn Hoàng Kiệt</h5>
                        <p class="card-text" style={{textAlign : 'center'}}>Backend developer</p>
                        <div>
                            <a href="#" class="btn btn-primary" style={{width: '100%'}}>Đến Github</a>
                        </div>
                        
                    </div>
                    
                    </div>
                </div> */}

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
     
              <div className="col">
                <div className='card'>
                  <div className="d-flex flex-column align-items-center justify-content-between">
                    <i class={`bi bi-person-fill pe-none p-3 fs-1 `} width="24" height="24"></i>
                    <div className='pb-3'>
                      <h6>Người dùng</h6>
                      <div className='text-center'>5</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className='card'>
                  <div className="d-flex flex-column align-items-center justify-content-between">
                    <i class={`bi bi-opencollective pe-none p-3 fs-1`} width="24" height="24"></i>
                    <div className='pb-3'>
                      <h6>Chuyến đang mở</h6>
                      <div className='text-center'>5</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className='card'>
                  <div className="d-flex flex-column align-items-center justify-content-between">
                    <i class={`bi bi-check-circle-fill pe-none p-3 fs-1`} width="24" height="24"></i>
                    <div className='pb-3'>
                      <h6>Chuyến hoàn thành</h6>
                      <div className='text-center'>5</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className='card'>
                  <div className="d-flex flex-column align-items-center justify-content-between">
                    <i class={`bi bi-activity pe-none p-3 fs-1`} width="24" height="24"></i>
                    <div className='pb-3'>
                      <h6>Lượt truy cập hôm nay</h6>
                      <div className='text-center'>5</div>
                    </div>
                  </div>
                </div>
              </div>

        </div>


        <div className="d-flex justify-content-between flex-wrap pb-5">






        </div>

        <div style={{ display: 'flex', flexDirection: 'column', height: '750px', justifyContent: 'space-between' }}>



          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div class="card" style={{ width: '30%', padding: '36px' }}>
              <Doughnut data={dataDoughnut} />;
            </div>

            <div class="card" style={{ width: '65%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '90%' }}>
                <Line data={dataLine} />
              </div>

            </div>


          </div>

          <div class="card" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '70%' }}>
              <Bar options={options} data={data} />;
            </div>

          </div>


            
          
        </div>

                {
                  !isLoading && <div class="">
                    <HighchartsReact 
                    options = { initOptions }
                    highcharts = { Highcharts }
                    constructorType = { 'mapChart' }
                    ref={chartRef}
                    />
                    </div>
                }
     
      </Layout>


    </>
  );
}

export default HomePage