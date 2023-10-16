import React, {useState} from "react";


const Search = (props) => {
    const [search, setSearch] = useState('')

    const validatedStringForFirstAndLastName = (value) => {
        let regExp = /^[a-zA-Z\s]*$/
        if (!regExp.test(value)) {
            value = value.replace(value[value.length - 1], '')
        }
        return value
    }
    return (
        <>
            <div className="container">
                <form action="#"
                      onSubmit={(e) => {
                          e.preventDefault()
                          if (search.trim().length > 0) {
                              props.onClickToSearch(search)
                          }
                      }}
                      className="find-location">
                    <input
                        type="text"
                        placeholder="Find your location..."
                        value={search}
                        onChange={(e) => setSearch(validatedStringForFirstAndLastName(e.target.value))}
                    />
                    <input type="submit"
                           defaultValue="Find"
                           onClick={() => {
                               if (search.trim().length > 0) {
                                   props.onClickToSearch(search)
                               }
                           }}
                    />
                </form>
            </div>
        </>
    )
}

export default Search