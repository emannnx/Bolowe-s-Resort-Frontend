import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

interface propType {
    query:string,
    setQuery:any,
    searching:boolean,
    placeHolder?:string,
    className?:string,
    setSearching?:any
}

const SearchBar =  ({query, setQuery, searching, placeHolder, className}:propType)=> {
    return (
        <div className={`relative h-fit flex items-center ${className}`}>
            <div className="absolute z-10  left-[15px] w-[30px] h-[30px] flex items-center">
                {
                    searching ? <CircularProgress sx={{color:"#000"}} /> : <SearchIcon  sx={{color:"#000"}}/>
                }
            </div>
            <input value={query} 
                onChange={(evt)=>setQuery(evt.target.value)} 
                placeholder={placeHolder}
                className={`h-[56px] w-full  outline-none rounded-[4px]  border-none focus:outline-none focus:border-black focus:border focus:border-solid focus:bg-transparent  bg-gray-300 text-black placeholder:text-slate-500 px-16 `}
            />
        </div>
    )
}

export default SearchBar 