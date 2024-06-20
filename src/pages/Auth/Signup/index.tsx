// SignUp.tsx
import AppLayout from 'components/AppLayout';
import Logo from 'components/Logo';
import { Heading2 } from 'components/Typography/Heading';
import { useAuth } from 'context/AuthContext';
import React, { useState } from 'react';

const SignUp = () => {
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, name);
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <>
      <AppLayout>
        <div className="min-h-screen grid grid-cols-12">
          <div
            className="xs:col-span-12 md:col-span-6 lg:col-span-8 xs:h-[25vh] md:h-full relative"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1622675363311-3e1904dc1885?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            }}
          >
            <div className="flex items-center justify-center flex-col absolute top-0 left-0 right-0 bottom-0 bg-primary/70 dark:bg-black/80">
              <div className="flex items-end gap-x-4 text-white dark:text-primary text-[72px] leading-none font-medium">
                <Logo size="70" />
                InterAct
              </div>
              <p className=" mt-4 font-Montserrat whitespace-nowrap transition ease-out text-secondary">
                Connect Seamlessly, Collaborate Effortlessly
              </p>
            </div>
          </div>
          <div className="xs:col-span-12 md:col-span-6 lg:col-span-4 h-full bg-gray-200 dark:bg-gray-800 p-8 flex items-center justify-center w-full">
            <div>
              <Heading2 className="mb-10 text-center" size="2xl">
                Register
              </Heading2>
              <button
                className="w-full px-4 py-2 text-lg mb-4 bg-white dark:bg-black dark:text-white dark:border-black border flex items-center justify-center gap-x-4 hover:shadow-xl rounded-md"
                onClick={handleGoogleSignIn}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt=" "
                  className="h-8 w-8"
                />
                Sign with Google
              </button>

              <div className="relative mb-10 mt-10">
                <p className="bg-gray-200 dark:bg-gray-800 text-gray-500 w-max mx-auto absolute px-4 -top-2 left-0 right-0 z-10">
                  Sign up with your Email
                </p>
                <div className="border-b border-gray-300 dark:border-gray-600 h-1" />
              </div>

              <form onSubmit={handleSignUp}>
                <label htmlFor="name" className="text-lg font-Oswald text-gray-500">
                  Full Name
                  <input
                    className="border-2 bg-black/5 dark:bg-white/20 border-gray-200 dark:border-gray-700 w-full py-2.5 font-Montserrat text-black dark:text-gray-200 outline-none text-base rounded-xl px-4 mb-2 focus:border-primary dark:focus:border-primary transition-all ease-in-out duration-300"
                    type="name"
                    placeholder="Jhon Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label htmlFor="email" className="text-lg font-Oswald text-gray-500">
                  Email
                  <input
                    className="border-2 bg-black/5 dark:bg-white/20 border-gray-200 dark:border-gray-700 w-full py-2.5 font-Montserrat text-black dark:text-gray-200 outline-none text-base rounded-xl px-4 mb-2 focus:border-primary dark:focus:border-primary transition-all ease-in-out duration-300"
                    type="email"
                    placeholder="example@abc.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label htmlFor="password" className="text-lg font-Oswald text-gray-500">
                  Password
                  <input
                    className="border-2 bg-black/5 dark:bg-white/20 border-gray-200 dark:border-gray-700 w-full py-2.5 font-Montserrat text-black dark:text-gray-200 outline-none text-base rounded-xl px-4 mb-4 focus:border-primary dark:focus:border-primary transition-all ease-in-out duration-300"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <p className="text-gray-500 my-4 text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </p>
                <button
                  className="w-full p-2.5  text-lg bg-accent/5 border border-accent text-accent rounded-md hover:bg-accent hover:text-white mb-4 transition-all ease-in-out duration-300"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default SignUp;
