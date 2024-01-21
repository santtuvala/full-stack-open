const Form = (props) => {
    return ( 
        <form onSubmit={props.add}>
        <div>name: <input onChange={props.handleNameChange}/></div>
        <div>number: <input onChange={props.handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form