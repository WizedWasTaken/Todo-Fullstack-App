/**
 *
 * @returns HTML for the error page
 */
export function getServerSideProps() {
  return {
    redirect: {
      destination: "/auth/error",
      permanent: false,
    },
  };
}

/**
 *
 * @returns HTML for the error page
 */
export default function ErrorPage() {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>Redirecting...</p>
    </div>
  );
}
