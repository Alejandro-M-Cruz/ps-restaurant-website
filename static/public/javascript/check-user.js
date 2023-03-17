const user = await (await fetch("http://localhost:8080/api/v1/users")).json()
if (user.error) {

}
