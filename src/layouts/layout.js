import LayoutHeader from './header/index.js'
import './layout.css';
import SideBar from './sidebar/index.js';
import LayoutFooter from './footer/index.js';
const Layout = ({ children }) => {
  return (
    <>
    <div>
      <div style={{display: 'flex'}}>
          <SideBar></SideBar>
          <div style={{flexGrow : '1', padding: '24px'}}>
          {children}
          </div>
      </div>
      
      <div style={{width: '100vw', height:'100px'}}>
      <LayoutFooter></LayoutFooter>
      </div>
      
    </div>
  
    </>
  )
}

export default Layout