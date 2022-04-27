const NavBar = (props)=>{
    React.useEffect(()=>{
        const burgerIcon = document.getElementById('burger');
        const navbarMenu = document.getElementById('nav-links');

        if (burgerIcon) burgerIcon.onclick = () => navbarMenu.classList.toggle('is-active');
    });

    const navNodes = props.links.map((link, index)=>{
        if(window.location.pathname === link.href){
            return(
                <a key={index} id={link.id} href={link.href} className="navbar-item is hoverable has-background-warning has-text-black">{link.name}</a>
            )
        };
        return(
            <a key={index} id={link.id} href={link.href} className="navbar-item is hoverable">{link.name}</a>
        )
    });

    return(
        <nav id="navbar" className="navbar is-dark has-shadow">
            <div className="navbar-brand">
                <a className="navbar-item" href={window.location.pathname}>
                    <i className="fas fa-search fa-2xl"></i>
                </a>
                <a className="navbar-burger" id="burger">
                        <span></span>
                        <span></span>
                        <span></span>
                </a>
            </div>

            <div className="navbar-menu" id="nav-links">
                <div className="navbar-start">
                    {navNodes}
                </div>
            </div>
        </nav>
    )
}

module.exports = NavBar;