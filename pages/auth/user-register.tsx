import { useFormik } from "formik";
import { GetServerSidePropsContext, NextPage } from "next";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import * as Yup from "yup";
import NextImage from "next/image";
import InputComponent from "@/components/common/input";
import ButtonComponent from "@/components/common/button";
import ErrorComponent from "@/components/common/error";
import NextLink from "next/link";
import { handleCreateUser } from "@/graphql/hooks/user-hook";
import { CreateUserInput } from "@/graphql/models/generated";

type Props = {
  csrfToken?: string;
};

const UserRegisterPage: NextPage<Props> = (props) => {
  const router = useRouter();

  let errorMsg = useMemo(() => {
    if (router.query?.error == "CredentialsSignin")
      return "Email or Password is Incorrect";
  }, [router.query?.error]);

  const formik = useFormik<CreateUserInput>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      providerId: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "Must contain 3 minimum characters")
        .max(24, "Must be 24 characters or less")
        .required("First name is required"),
      lastName: Yup.string()
        .min(1, "Must contain 1 minimum characters")
        .max(24, "Must be 24 characters or less")
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      errorMsg = "";
      const response = await handleCreateUser(values);
      if (!response.createUser) errorMsg = "Unable to create user";
      await signIn("credentials", {
        redirect: true,
        email: values.email,
        password: values.password,
        callbackUrl: `${window.location.origin}`,
      });
      setSubmitting(false);
    },
  });

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <NextLink href="/">
          <a className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center">
              <NextImage
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
                height={48}
                width={48}
                priority
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Join DocAssitant 🤩
            </h2>
          </a>
        </NextLink>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <input
                name="csrfToken"
                type="hidden"
                defaultValue={props.csrfToken}
              />
              <div className="grid grid-cols-2 space-x-2">
                <InputComponent
                  name="firstName"
                  type="text"
                  label="First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName ? formik.errors.firstName : ""
                  }
                />
                <InputComponent
                  name="lastName"
                  label="Last Name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName ? formik.errors.lastName : ""}
                />
              </div>

              <InputComponent
                name="email"
                label="Email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email ? formik.errors.email : ""}
              />
              <InputComponent
                label="Create Password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password ? formik.errors.password : ""}
              />

              {/* <div className="flex items-center justify-between">
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
              </div> */}

              {errorMsg && (
                <div className="text-center">
                  <ErrorComponent message={errorMsg} />
                </div>
              )}
              <div>
                <ButtonComponent
                  text="Sign in"
                  type="submit"
                  loading={formik.isSubmitting}
                  btnColor="primary"
                />
              </div>
            </form>

            <div className="my-3 ">
              <NextLink href="/auth/login">
                <a href="#" className="font-medium text-sm">
                  Already an User ?{" "}
                  <span className=" text-indigo-600 hover:text-indigo-500">
                    Login
                  </span>
                </a>
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(ctx);
  const session = await getSession({ ctx });
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

export default UserRegisterPage;
