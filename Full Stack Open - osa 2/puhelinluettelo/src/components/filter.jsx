const Filter = (props) => {
    return (
        <form>
            <div>filter shown with: <input onChange={props.handleFilterChange}/></div>
        </form>
    )
}

export default Filter