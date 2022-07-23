얼럿 창엔 `3`이 출력됩니다.


```js run
alert( null || 2 && 3 || 4 );
```

AND 연산자 `&&`의 우선순위는 `||`보다 높습니다. 따라서 `&&`가 먼저 실행됩니다.

`2 && 3 = 3`이므로, 문제에서 제시한 표현식은 아래와 같이 바꿔쓸 수 있습니다.

```
null || 3 || 4
```

따라서 첫 번째 truthy인 `3`이 출력됩니다.