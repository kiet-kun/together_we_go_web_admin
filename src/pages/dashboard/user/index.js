import React, { useEffect, useState } from "react"
import axios from "axios";
import Layout from '../../../layouts/layout';
import "./user.css";
import movies from "./movies";
import MyPagination from '../../../components/datatable_pagination';

const data = [{
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const UserPage = () => {
    let [totalInDB, setTotalInDB] = useState(movies.length);
    let [page, setPage] = useState(1);
    let [pageSize, setPageSize] = useState(20);
    let [datas, setDatas] = useState([]);
    let [sortOptions, setSortOptions] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let [keyword, setKeyword] = useState('');
    
    async function loadPage(){
      setIsLoading(true);
      let end = page * pageSize - 1;
      let start = (page - 1) * pageSize;

      setDatas(movies.slice(start, end));
      await sleep(2 * 1000);
    
      setIsLoading(false);
    }

    useEffect(() => {      
      loadPage();
    }, [totalInDB, page, pageSize]);

  
    return (
        <>
             <Layout>
              <div>

             <form class="d-flex container" role="search" style={{marginBottom: '36px'}}>
                <input class="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Tìm kiếm</button>
             </form>

  
             <div className="card container data-table" >
            <MyPagination totalInDB={totalInDB} page={page} pageSize={pageSize} isLoading={isLoading} setPage={setPage} loadPage={loadPage} ></MyPagination>
   
             <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Mã</th>
                      <th scope="col">Tên</th>
                      <th scope="col">Trạng thái</th>                   
                    </tr>
                  </thead>
                  <tbody>
                    {
                      isLoading && <div>Loading</div>
                    }
                    { !isLoading && datas.map(function(object, i){
                        // return <ObjectRow obj={object} key={i} />;
                        return <tr>
                          <th scope="row">{object.id}</th>
                          <td>{object.title}</td>
                          <td>{object.year}</td>
                          <td>{object.runtime}</td>
                        </tr>
                    })}
                        
                    
                   
                  </tbody>
                </table>
              </div>

              </div>

             </Layout>
        </>   
    );
}

export default UserPage