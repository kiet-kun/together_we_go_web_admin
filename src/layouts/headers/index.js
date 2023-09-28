import './headers.css';


const LayoutHeader = () => {
    console.log(process);
    if (typeof process !== 'undefined') {
        console.log(process.env.REACT_APP_API_LINK);
      } else {
        console.log("Environment variable not available.");
      }
    return (
        <div>
        
        <nav class="py-2 bg-body-tertiary border-bottom">
            <div class="container d-flex flex-wrap">
            <ul class="nav me-auto">
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2 active" aria-current="page">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Features</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Pricing</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">FAQs</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">About</a></li>
            </ul>
            <ul class="nav">
                {/* <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Login</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Sign up</a></li> */}
                <div class="flex-shrink-0 dropdown">
                <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle"/>
                </a>
                <ul class="dropdown-menu text-small shadow">
                    <li><a class="dropdown-item" href="#">New project...</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
            </ul>
            </div>
        </nav>
        <header class="py-3 mb-4 border-bottom">
            <div class="container d-flex flex-wrap justify-content-center">
            <a href="/" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
                {/* <svg class="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"/></svg> */}
                <img 
                         src='/assets/image/icon-trung-thu-2.png'
                        alt="" height="32"
                    />
                <span class="fs-4">Double header</span>
            </a>
            <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
                <input type="search" class="form-control" placeholder="Search..." aria-label="Search"/>
            </form>

            
            </div>
            
        </header>
        </div>
    )
}

export default LayoutHeader;