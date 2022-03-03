import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions/authenticationAction";

export function Login() {
  const dispatch = useDispatch();

  function handleSignInWithGoogle() {
    dispatch(signIn());
  }

  return (
    <section>
      <h2>Login Page</h2>

      <p>Sign in with google</p>

      <button onClick={handleSignInWithGoogle}>Sign In with google</button>
    </section>
  );
}
