import Logo from "../assets/images/bolowies_logo_nw.png";

const PageNotFound = ()=> {
    return (
        <section className="h-[100vh] w-full flex flex-col items-center justify-center bg-transparent">
            <img className="w-[70px] h-[80px] " src={Logo} alt=""/>
            <div className="flex divide-x divide-solid   justify-center">
                <h1 className="font-medium mr-5">Page not found</h1>
                <a className="text-black/60 pl-5" href="/">Home page</a>
            </div>
        </section>
    )
}

export default PageNotFound;