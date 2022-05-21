import { useSession, signIn, signOut } from "next-auth/react";
export default function Component() {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <p>Loading...</p>;
  }
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        {session.user?.image && (
          <span>
            <img src={session.user?.image} alt={session.user.name || ""} />
          </span>
        )}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
