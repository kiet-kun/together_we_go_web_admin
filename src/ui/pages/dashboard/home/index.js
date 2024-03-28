import Layout from '../../../layouts/layout';
import "./home.css";
import Chart from 'chart.js/auto';
import { Line, Bar, Doughnut } from "react-chartjs-2";

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
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const HomePage = () => {
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

      </Layout>


    </>
  );
}

export default HomePage