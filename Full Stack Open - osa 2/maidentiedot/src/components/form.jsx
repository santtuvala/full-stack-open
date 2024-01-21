const Form = (props) => {
    return ( 
        <form>
            <div>find countries: <input onChange={props.onChange}/></div>
        </form>
    )
}

export default Form