import LayoutHeader from './header/index.js'
import './layout.css';
import SideBar from './sidebar/index.js';
import LayoutFooter from './footer/index.js';
import { setTheme, THEME } from '../utils/theme.js';

const Layout = ({ children }) => {
  return (
    <>
    <div>
      <div class="d-flex justify-content-between">
          <div style={{width: '20vw'}}>
            <SideBar></SideBar> 
          </div>         
          <div style={{width: '80vw', paddingTop: '5vh', paddingRight: '8px'}}>        
              {children}
          </div>
      </div>
      
      <div style={{width: '100%', height:'100px'}}>
          <LayoutFooter></LayoutFooter>
      </div>
      
       {/* Change dark/light mode buttom */}
       {/* <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
          <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
                  id="bd-theme"
                  type="button"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  aria-label="Toggle theme (auto)">
            <i class="bi bi-circle-half me-2 opacity-50 theme-icon"  width="1em" height="1em"></i>            
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
            <li>
              <button  onClick={() => setTheme(THEME.LIGHT)} type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
              <i class="bi bi-lightbulb me-2 opacity-50 theme-icon" width="1em" height="1em"></i>
                Sáng
              </button>
            </li>
            <li>
              <button  onClick={() => setTheme(THEME.DARK)} type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
                <i class="bi bi-moon-fill me-2 opacity-50 theme-icon"  width="1em" height="1em"></i>
                Tối
              </button>
            </li>
            <li>
              <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
                <i class="bi bi-circle-half me-2 opacity-50 theme-icon"  width="1em" height="1em"></i>
                Tự độ
              </button>
            </li>
          </ul>
      </div> */}
    </div>
  
    </>
  )
}

export default Layout