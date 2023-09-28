import Layout from '../../../layouts/layout';
import "./home.css";

const HomePage = () => {
    return (
        <>
             <Layout>
                <p style={{textAlign : 'center', marginBottom: '16px'}}>Thành viên phát triển</p>
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
                </div>
                

             </Layout>
        </>   
    );
}

export default HomePage