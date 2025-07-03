import logo from '../../assets/ttt.png'
import './AsideNav.css'
import Home from '../../pages/Home'

const AsideNav = () => {
    return (<>

        <nav className="navbar bg-dark border-bottom border-body" id="headers0" data-bs-theme="dark">
            <div className="container-fluid" id="headers">
                <a className="navbar-brand"><img id= "logo" src={logo} /></a>
                <h1>ANtiSocial Net  </h1>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>

        <div className="d-flex align-items-start">
            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>
                <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Perfil</button>
                <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Postear</button>
                <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Log Out</button>
            </div>
            <div className="tab-content" id="v-pills-tabContent"  >
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
                    <main>
                        <Home></Home>
                    </main>
                
                </div>
                
            </div>
        </div>
    </>)
}

export default AsideNav;