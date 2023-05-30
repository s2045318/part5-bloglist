import loginService from '../services/login'

const LoginForm = ({ username, setUsername, password, setPassword, setUser, setPopupMessage }) => {
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setPopupMessage({
        text: 'wrong username or password',
        class: 'error'
      })
      setTimeout(() => {
        setPopupMessage({
          text: null,
          class: ''
        })
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="username"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
