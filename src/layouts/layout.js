import LayoutHeader from './header/index.js'
import './layout.css';

const Layout = ({ children }) => {
  return (
    <>   
      <LayoutHeader></LayoutHeader>
      <div class="layout">
        {/* <main>{children}</main> */}
        {children}
      </div>   
    </>
  )
}

export default Layout