import LayoutHeader from './header/index.js'
import './layout.css';
import SideBar from './sidebar/index.js';
import LayoutFooter from './footer/index.js';
import { setTheme, THEME } from '@/utils/theme.js';

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <div class="d-flex">
          <SideBar />
          <div class="vh-100 vw-100 overflow-auto">
            <div className="mx-5 pt-5">
              {children}
            </div>
            <LayoutFooter />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout