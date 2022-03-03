import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../redux/actions/authenticationAction";

export function Login() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { accessToken, loading } = useSelector<any>(
    (state) => state.auth
  ) as any;

  function handleSignInWithGoogle() {
    dispatch(signIn());
  }

  useEffect(() => {
    if (accessToken) {
      navigateTo("/");
    }
  }, [accessToken]);

  return (
    <section>
      <h2>Login Page</h2>

      <p>Sign in with google</p>
      <span></span>

      {loading ? (
        <span>loading...</span>
      ) : (
        <button onClick={handleSignInWithGoogle}>Sign In with google</button>
      )}
    </section>
  );
}
