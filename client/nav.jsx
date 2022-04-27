const NavBar = (props)=>{
    const navNodes = props.links.map((link, index)=>{
    return(
        <div key={index} className="navlink"><a id={link.id} href={link.href}>{link.name}</a></div>
    )
    });

    return(
        <nav id="navbar">
            {navNodes}
        </nav>
    )
}

module.exports = NavBar;