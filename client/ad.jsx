const Advertisement = (props)=>{
    console.log(props);
    return(
        <img src={props.href} alt={props.alt} />
    )
}

module.exports = Advertisement;

