import { BiSolidLogInCircle } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SuccessAlert from '../components/SuccessAlert';
import { useForm } from 'react-hook-form';
import { login } from '../utils/api/authApi';
import DangerAlert from '../components/DangerAlert';
import { useEffect, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export default function Login({ setIsAuth }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();

  const [dangerMessage, setDangerMessage] = useState(null);

  useEffect(() => {
    if (location.state?.dangerMessage) {
      setDangerMessage(location.state.dangerMessage);
    }
  }, [location.state]);

    useEffect(() => {
    const msg = sessionStorage.getItem('logoutSuccess');
    if (msg) {
      toast.success(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        onClose: () => {
          sessionStorage.removeItem('logoutSuccess');
        }
      });
    }

    if (sessionStorage.getItem('registerSuccess')) {
      setSuccess(true);
      setSuccessMessage(sessionStorage.getItem('registerSuccess'));
      sessionStorage.removeItem('registerSuccess');
    }
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit =  async (data) => {
    try {
      await login(data);
      sessionStorage.setItem('success', 'Login Success!.');
      setIsAuth(true);
    } catch (error) {
      navigate('/login', { state: {dangerMessage: 'Login failed, bad credentials!.'} });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <BiSolidLogInCircle className='mx-auto h-15 w-auto  text-white' />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          { dangerMessage && <DangerAlert title='Failed' description={dangerMessage} onClose={() => setDangerMessage(null)} />}
          { success  && <SuccessAlert title='Success' description={successMessage} /> }
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  { ...register('username') }
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  { ...register('password') }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Don&apos;t have any account?{' '}
            <Link to='/register' className='font-semibold text-indigo-400 hover:text-indigo-300'>Register</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}