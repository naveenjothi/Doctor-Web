import { useFormik } from "formik";
import { GetServerSidePropsContext, NextPage } from "next";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import NextImage from "next/image";
import InputComponent from "@/components/common/input";
import ButtonComponent from "@/components/common/button";
import GoogleIcon from "@/assets/svg/google-icon.svg";

type Props = {
  csrfToken?: string;
};

const LoginPage: NextPage<Props> = (props) => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const formik = useFormik({
    initialValues: { email: "", password: "", remember: false },
    validationSchema: Yup.object({
      email: Yup.string()
        .max(30, "Must be 30 characters or less")
        .email("Invalid email address")
        .required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const res: any = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: `${window.location.origin}`,
      });
      if (res?.error) {
        setError(res.error);
      } else {
        setError(null);
      }
      if (res.url) router.push(res.url);
      setSubmitting(false);
    },
  });

  const handleGoogleLogin = async () => {
    const res = await signIn("google");
  };
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <NextImage
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
              height={48}
              width={48}
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <input
                name="csrfToken"
                type="hidden"
                defaultValue={props.csrfToken}
              />
              <InputComponent
                name="email"
                label="Email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.email}
              />
              <InputComponent
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.password}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={formik.values.remember}
                    onChange={formik.handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <ButtonComponent
                  text="Sign in"
                  type="submit"
                  loading={formik.isSubmitting}
                  btnColor="primary"
                />
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div>
                  <ButtonComponent
                    text="Sign in with Google"
                    type="button"
                    btnColor="secondary"
                    icon={
                      <div className="h-5 w-5">
                        <GoogleIcon />
                      </div>
                    }
                    onClick={handleGoogleLogin}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  //TODO Need to check why redirect not working
  const session = await getSession();
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: { csrfToken },
  };
}

export default LoginPage;
