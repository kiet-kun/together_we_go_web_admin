import Navigation from './navigation'
import Footer from './footer'
import LayoutSidebar from './sidebar/index.js'
import { THEME, initTheme, toggleTheme, setTheme, resetTheme } from '../utils/theme'

const Layout = ({ children }) => {
  return (
    <>
    {/* Change dark/light mode buttom */}
    <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
                <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
                    id="bd-theme"
                    type="button"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    aria-label="Toggle theme (auto)">
                    <svg class="bi my-1 theme-icon-active" width="1em" height="1em"><use href="#circle-half"></use></svg>
                    <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
                    <li>
                        <button
                            onClick={() => setTheme(THEME.LIGHT)}
                            type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
                            <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#sun-fill"></use></svg>
                            Light
                            <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setTheme(THEME.DARK)}
                            type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
                            <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#moon-stars-fill"></use></svg>
                            Dark
                            <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
                        </button>
                    </li>
                    <li>
                        <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
                            <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#circle-half"></use></svg>
                            Auto
                            <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
                        </button>
                    </li>
                </ul>
    </div>

    <div class="row">
     <div class="col-xs-6 col-md-4"><LayoutSidebar></LayoutSidebar></div>
      <div class="col-xs-12 col-md-8"> <main>{children}</main></div>
    
    </div>
      <div>
        
       
      </div>   
      {/* <Footer /> */}
    </>
  )
}

export default Layout