// const navLinks = [
//     {
//         name: 'Home',
//         link: '/'
//     },
//     {
//         name: 'Documentation',
//         link: '/'
//     }
// ]

// const NavBar = (props)=>{

//     const navNodes = props.links.map(link=>{
//         return(
//             <nav class="navbar is-dark has-shadow">
//                 <div class="navbar-brand">
//                     <a class="navbar-item fa-2x" href="/">
//                         <i class="fas fa-gamepad"></i>
//                     </a>
//                     <a class="navbar-burger" id="burger">
//                             <span></span>
//                             <span></span>
//                             <span></span>
//                     </a>
//                 </div>

//                 <div class="navbar-menu" id="nav-links">
//                     <div class="navbar-start">
//                         <a class="navbar-item is hoverable" href={link.link}>{link.name}</a>
//                     </div>
//                 </div>
//             </nav>
//         );
//     });

// }

// const init = async()=>{
//     ReactDOM.render(
//         <NavBar links={navLinks}/>,
//         document.getElementById('nav')
//     );

// }

// window.onload = init;