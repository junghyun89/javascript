**에러**가 발생합니다!

코드를 직접 실행해봅시다.

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}
(user.go)() // error!
```

브라우저에서 출력되는 에러 메시지만 봐서는 무엇이 잘못되었는지 파악하기 어려울 겁니다.

**에러는 `user = {...}`뒤에 세미콜론이 없어서 발생했습니다.**

자바스크립트는 괄호(`(us...` ) 앞에 세미콜론을 자동으로 넣어주지 않습니다. 따라서 코드는 아래와 같아집니다.

```js no-beautify
let user = { go:... }(user.go)()
```

이렇게 두 표현식이 합쳐지면서 인수가 `(user.go)`인 객체 형태의 함수를 호출한 것처럼 되었습니다. 여기에 더하여 객체 `user`가 정의되지 않은 상태에서 같은 줄에 `let user`를 사용했기 때문에 에러가 발생합니다.

`user = {...}`뒤에 세미콜론을 붙여서 에러를 해결해봅시다.

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*
(user.go)() // John
```

참고로, `(user.go)`를 감싸는 괄호는 아무런 역할을 하지 않습니다. 괄호는 대개 연산자 우선순위를 바꾸는 데 사용되는데, `(user.go)`에선 점 `.` 연산자가 먼저 동작하기 때문에 의미가 없습니다. 문제 출제 의도는 세미콜론 여부였습니다.
