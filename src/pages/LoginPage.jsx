// import axios from "axios";
// import { useEffect } from "react";

function LoginPage() {

    // useEffect(() => {
    //     const authToken = localStorage.getItem("token");
    //     if (authToken) {
    //         // Redirect to another page if token is present
    //         window.location = "/admin";
    //     }
    // }, []);

    // const login = async (event) => {
    //     event.preventDefault(); // Prevent the default form submission
    //     try {
    //         const username = document.querySelector('input[name=username]').value;
    //         const password = document.querySelector('input[name=password]').value;
    //         const response = await axios.post('http://13.214.18.38:8000/api/login', {
    //             username,
    //             password
    //         });

    //         localStorage.setItem('token', response.data.token);
    //         window.location = '/admin';

    //         console.log(username, password);
    //         console.log(response.data.token);
    //     } catch (error) {
    //         alert("Your username or password is incorrect!");
    //         console.log('error', error);
    //     }
    // };

    return (
        <>
            <section className="bg-[#d2e4ff]">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#2A3990] md:text-2xl ">
                                Sign in to go to the admin page
                            </h1>
                            {/* <form onSubmit={login}> */}
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-[#2A3990] ">Username</label>
                                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2" placeholder="username" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#2A3990] ">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-[#2A3990] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5">Sign in</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginPage;
