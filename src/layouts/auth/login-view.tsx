'use client';

import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Toast from '@/components/toast';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';

export default function AuthLoginView() {
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);

  const [toastType, setToastType] = useState<'success' | 'error' | 'default'>(
    'default',
  );

  const [message, setMessage] = useState('Default toast');

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formValue) => {
    console.log('process.env.NEXT_BASE_API_URL', process.env.NEXT_BASE_API_URL)
    try {
      const { data, status } = await axios.post(`${process.env.NEXT_BASE_API_URL}/login`, {
        ...formValue,
        username: '',
      });

      console.log('data', data)
      console.log('status', status)

      if (
        status <= 201 &&
        !['User not found', 'Incorrect password'].includes(data.message)
      ) {
        setToastType('success');
        setMessage(data.message);

        let cookie = `accessToken=${data.access_token};`;
        cookie += 'path=/;';
        cookie += `max-age=/${60 * 60 * 24 * 7};`;

        document.cookie = cookie;

        localStorage.setItem('accessToken', data.access_token);

        window.location.replace('/profile');
      } else {
        setToastType('error');
        setMessage(data.message);
      }
    } catch (error) {
      setToastType('error');

      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data.message
            ? error.response.data.message
            : error.response?.data,
        );
      } else {
        setMessage(error as string);
      }
    } finally {
      reset();

      handleShowToast();
    }
  });

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <button
        className="max-w-min flex flex-row items-center gap-2 text-sm hover:opacity-85 w-auto"
        onClick={() => router.push('/')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        <span>Back</span>
      </button>

      <div className="form-wrapper">
        <h3 className="text-xl font-bold mb-6 px-6">Login</h3>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
            <RHFTextField
              name="email"
              type="email"
              variant="medium"
              disabled={isSubmitting}
              placeholder="Enter email"
            />
            <RHFTextField
              name="password"
              type="password"
              variant="medium"
              disabled={isSubmitting}
              placeholder="Enter password"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#62CCCD] hover:from-[#62CCCD]/85 to-[#4599DB] hover:to-[#4599DB]/85 py-3 px-8 rounded-lg text-sm inline-flex items-center leading-6 justify-center disabled:from-[#62CCCD]/70 disabled:to-[#4599DB]/70 disabled:text-white/70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin mr-3 h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 25 25"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </FormProvider>
      </div>

      <p className="text-sm inline-flex items-center justify-center gap-2">
        <span>No account?</span>
        <span
          className="text-transparent bg-clip-text bg-gradient-to-tr from-[#D5BE88] via-[#F3EDA6] to-[#94783E] border-b border-[#D5BE88] cursor-pointer hover:opacity-85"
          onClick={() => router.push('/auth/register')}
        >
          Register here
        </span>
      </p>

      {showToast && <Toast type={toastType} message={message} />}
    </div>
  );
}
