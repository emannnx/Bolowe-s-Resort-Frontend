import Logo from "../../assets/images/bolowies_logo_nw.png";
import { Register as register } from "../../services/AdminAuth";
import { toast } from 'react-toastify';
import { CircleLoader } from "react-spinners";
import { useState } from "react";
import "./Login.css"

function Register  () {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (evt:any )=>{
      evt.preventDefault()
      setIsLoading(true);

      const formData = new FormData(evt.target)
  
        register({name:formData.get("username"),email:formData.get("email") , password:formData.get("password"),access_code:formData.get("access_code")})
        .then(
          res=> {
            setIsLoading(false)
            toast.success("You have successfully created your admin account. Please procced to login")
          },
          err=> { 
            setIsLoading(false)
            toast.error(err.response.data.msg)
          }
        )
    }
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={Logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create your admin account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form  onSubmit={handleSubmit} className="space-y-6 mx-auto" action="#" method="POST">
            <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="access_code" className="block text-sm font-medium leading-6 text-gray-900">
                    Access code
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot access_code?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="access_code"
                    name="access_code"
                    type="password"
                    autoComplete="access-code"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {
                    isLoading ? <CircleLoader color="#fff"/> :  "Register"
                  }
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already  have an admin account?{' '}
              <a href="/admin/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  


export default Register