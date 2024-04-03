<script>
  import { onMount } from "svelte";
  import { auth, loginWithEmailPassword, loginWithGoogle, logout, registerWithEmailPassword } from "$app/services/firebase_auth";

  let user = null;
  let email = '';
  let password = '';
  let confirmPassword = '';
  let isRegistering = false;

  onMount(() => {
    auth.onAuthStateChanged((u) => {
      user = u;
    });
  });

</script>

{#if user}
  <div>
    <p>Welcome, {user.displayName}</p>
    <button on:click={logout}>Logout</button>
  </div>
{:else}
  <div class="login-card">
    {#if isRegistering}
      <p>Register with your email and password</p>
      <input type="email" bind:value={email} name="" id="" placeholder="Email"/>
      <input type="password" bind:value={password} name="" id="" placeholder="Password">
      <input type="password" bind:value={confirmPassword} name="" id="" placeholder="Confirm Password">
      <button on:click={() => registerWithEmailPassword(email, password, confirmPassword)}>Register</button>
      <button on:click={() => isRegistering = false}>Back to Login</button>
    {:else}
    <p>Please login to continue</p>
      <div>
        <input type="email" bind:value={email} placeholder="Email"/>
        <input type="email" bind:value={password} placeholder="Password">
        <button on:click={loginWithEmailPassword}>Login with Email</button>
      </div>
    <button on:click={loginWithGoogle} class="google-login-btn">Login with Google</button>
    <button on:click={() => isRegistering = true}>Register Account</button>
    {/if}
  </div>
{/if}

<style >
  body, input, button {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .login-card {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #E0E0E0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
}
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}
button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #0056b3;
}
/* Google login button to differentiate from regular login/register */
.google-login-btn {
  background-color: #DB4437; /* Google's brand color */
}

.google-login-btn:hover {
  background-color: #b3362a;
}

/* Utility class for the 'Back to Login' button to make it stand out less */
.secondary-btn {
  background-color: #6c757d;
}

.secondary-btn:hover {
  background-color: #545b62;
}

/* Helper text and error messages */
.help-text, .error-message {
  font-size: 0.9rem;
  color: #6c757d;
  margin: 5px 0;
}

.error-message {
  color: #dc3545; /* Bootstrap's danger color for errors */
}

</style>