function Login(props) {

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={props.onLogin}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          value={props.email || ""}
          onChange={props.handleChangeEmail}
        ></input>
        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          value={props.password || ""}
          onChange={props.handleChangePassword}
        ></input>
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
