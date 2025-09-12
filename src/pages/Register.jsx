import { useInput } from '../hooks/useInput';
import { BiSolidBookOpen } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../utils/api/userApi';

export default function Register() {
  const navigate = useNavigate();
  const [ username, onUsernameChange ] = useInput();
  const [ password, onPasswordChange ] = useInput();
  const [ fullName, onFullNameChange ] = useInput();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser({ username, password, fullName });
      sessionStorage.setItem('registerSuccess', 'Register successfully!.');
      navigate('/');
    } catch (error) {
      const errorList = error.response.data;

      errorList.forEach(err => {
        console.log(err.location);
      });
    }
  
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <BiSolidBookOpen className='mx-auto h-15 w-auto  text-white' />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Register account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  onChange={onUsernameChange}
                  value={username}
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
                  onChange={onPasswordChange}
                  value={password}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fullname" className="block text-sm/6 font-medium text-gray-100">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  autoComplete="fullname"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  onChange={onFullNameChange}
                  value={fullName}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Do you have account?{' '}
            <Link to='/login' className='font-semibold text-indigo-400 hover:text-indigo-300'>Login</Link>
          </p>
        </div>
      </div>
    </>
  )
}