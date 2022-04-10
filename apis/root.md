## 목적

> 상점 개설을 위한 유저 서비스

## 구현기능

- [ ] 회원 가입
- [ ] 로그인
- [ ] 회원 탈퇴

<br>

### 💡 API 명세서

> 1. 회원가입

- Request

**URL :/api/sign-up** ex)`/api/sign-up` <br>
**Method :POST** <br>
**Headers :** "Content-type" : "application/json; charset=utf-8"

```js
// 아래 코드 설명
{
  id: String, //유저 아이디
  password: String, //유저 패스워드
  email: String, //유저 이메일
  stroeName: String, //개설할 상점 명
}
```

<br>

- Response

**Status**

> **성공 :** 201(Created)
> **실패 :** 400(Bad Request), 409(Conflict)

**Content-type :** application/json; charset=utf-8

- 성공

```js
{
  success: Boolean,
  msg: String,
  status: Number,
}
```

- 예시

```js
{
  "success": true,
  "msg": "회원가입이 되었습니다.",
  "status": 201,
}
```

<br>

- 실패

```js
{
  success: Boolean,
  msg: String,
  status: Number,
}
```

- 예시

```js
// id, password, email, stroeName의 value가 존재하지 않을 때
{
  "success": false,
  "msg": "(존재하지 않는 key) 은(는) 필수로 입력해야 합니다.",
  "status": 400,
}

// email 형식이 맞지 않을 때
{
  "success": false,
  "msg": "이메일 형식이 맞지 않습니다.",
  "status": 400,
}

// 중복된 id, email, stroeName이 존재할 때
{
  "success": false,
  "msg": "(중복된 key) 을(를) 다른 사용자가 사용하고 있습니다.",
  "status": 409,
}
```

<br>
<br>

> 2. 로그인

- Request

**URL :/api/sign-in** ex)`/api/sign-in` <br>
**Method :POST** <br>
**Headers :** "Content-type" : "application/json; charset=utf-8"

```js
// 아래 코드 설명
{
  id: String, //유저 아이디
  password: String, //유저 패스워드
}
```

<br>

- Response

**Status**

> **성공 :** 200(OK)
> **실패 :** 400(Bad Request)

**Content-type :** application/json; charset=utf-8

- 성공

```js
{
  success: Boolean,
  msg: String,
  status: Number,
}
```

- 예시

```js
{
  "success": true,
  "msg": "로그인 되었습니다.",
  "status": 200,
}
```

<br>

- 실패

```js
{
  success: Boolean,
  msg: String,
  status: Number,
}
```

- 예시

```js
// id가 없거나 비밀번호를 틀렸을 때
{
  "success": false,
  "msg": "존재하지 않는 아이디이거나 비밀번호가 일치하지 않습니다.",
  "status": 400,
}
```

<br>
<br>

> 3. 회원 탈퇴

- Request

**URL :/api/resign** ex)`/api/resign` <br>
**Method :DELETE** <br>

<br>

- Response

**Status**

> **성공 :** 200(OK)
> **실패 :** 400(Bad Request)

**Content-type :** application/json; charset=utf-8

- 성공

```js
{
  success: Boolean,
  msg: String,
  status: Number,
}
```

- 예시

```js
{
  "success": true,
  "msg": "회원 탈퇴 되었습니다.",
  "status": 200,
}
```

<br>

- 실패

```js
{
  success: Boolean,
  msg: String,
  status: Number,
}
```

- 예시

```js
// id가 존재하지 않을 때
{
  "success": false,
  "msg": "회원 탈퇴에 실패하였습니다.",
  "status": 400,
}
```
