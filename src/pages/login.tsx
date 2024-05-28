import { useFormik } from 'formik';
import CustomInput from '../components/input';
import Button from '../components/button';
import { useState } from 'react';
import { Input, message } from 'antd';
import type { GetProp } from 'antd';
import type { OTPProps } from 'antd/es/input/OTP';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

type emailTypes = {
  email: string;
};

const LoginScreen = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const GOBASEURL = import.meta.env.VITE_GORULES_BASEURL;

  const initialValues = {
    email: '',
  };

  const onChange: GetProp<typeof Input.OTP, 'onChange'> = async (text) => {
    try {
      const response = await axios.post(`${GOBASEURL}/v1/user/auth/check_otp/`, {
        otp: text,
        email: formik.values.email,
      });
      message.success(response?.data?.status_message);
      Cookies.set('go_rules_token', response?.data?.data?.token);
      navigate('/projects');
    } catch (error: unknown) {
      message.error('Invalid Otp');
      setError('Invalid otp!');
    }
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values: emailTypes) => {
      try {
        setLoading(true);
        const response = await axios.post(`${GOBASEURL}/v1/user/auth/login/`, values);
        setShowOtp(true);
        message.success(response?.data?.status_message);
        setLoading(false);
      } catch (err: any) {
        console.log('Email error', err);
        message.error(err?.response?.data?.status_message);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-8 justify-center p-5 items-center md:w-[50%] w-full">
          <img src="https://gorules.io/logo.svg" alt="Logo" width={150} />
          <h1 className="md:text-2xl text-xl font-semibold text-nowrap">
            {showOtp ? 'Check your email for a code' : 'Sign in to IA Scheme Builder'}
          </h1>
          {showOtp ? (
            <>
              <p className=" text-[#9e9494] text-center">
                We have sent a 6-chracter code to xyz@ramailo.tech. The code expires shortly , so please it soon.{' '}
              </p>
              <Input.OTP className=" w-full" formatter={(str) => str.toUpperCase()} {...sharedProps} />
              <p className=" text-red-500">{error}</p>
              <p
                className=" text-blue-500 cursor-pointer"
                onClick={() => {
                  formik.handleSubmit;
                }}
              >
                Didn’t receive code? Try again
              </p>
            </>
          ) : (
            <>
              <p className="text-[#9e9494]">Please use your work email.</p>
              <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-5">
                <CustomInput
                  type="email"
                  placeholder="Enter email"
                  className="w-full"
                  name="email"
                  id="email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                />
                <Button text={loading ? 'Loading...' : 'Submit'} className="w-full " onClick={() => {}} />
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
