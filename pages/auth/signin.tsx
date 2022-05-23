import { GetServerSidePropsContext, NextPage } from "next";
import { getCsrfToken } from "next-auth/react";

type Props = {
  csrfToken?: string;
};

const EmailSignInPage: NextPage<Props> = ({ csrfToken }) => {
  return (
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email address
        <input type="email" id="email" name="email" />
      </label>
      <button type="submit">Sign in with Email</button>
    </form>
  );
};

export default EmailSignInPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
