간단한 해결책은 아래와 같습니다.

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*
let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

`Math.random() - 0.5`의 계산 결과는 양수나 음수 둘 중 하나이기 때문에 정렬 함수는 요소를 무작위로 재 정렬해줍니다.

그런데 `sort`는 이런 용도로 만들어진 메서드가 아니기 때문에 위와 같이 답안을 작성하면 `숫자 1과 2, 3`으로 만들 수 있는 순열이 같은 빈도로 나타나지 않습니다.

예시를 이용해 이를 살펴봅시다. 아래 코드는 함수 `shuffle`을 백만 번 실행시키고 가능한 한 모든 결과의 빈도를 세줍니다. 


```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
// 1, 2, 3으로 만들 수 있는 모든 순열의 빈도를 세줍니다.
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};
for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}
// 만들 수 있는 모든 순열의 생성 빈도를 세서 출력해줍니다.
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

위 코드를 실행하면 아래와 유사한 결과가 도출됩니다(자바스크립트 엔진마다 다를 수 있습니다).

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

`123`과 `213`이 나타나는 빈도가 높은 것으로 보아 기존 코드를 이용하면 결과가 한쪽으로 쏠릴 수 있다는 것을 알 수 있습니다.

실행 결과는 자바스크립트 엔진마다 다르겠지만, 기존 코드는 문제에서 제시한 조건을 만족하지 못한다는 사실을 알게 되었습니다.

왜 위 코드는 의도한 대로 동작하지 않는 걸까요? 그 이유는 `sort`를 실행했을 때 내부 동작이 블랙박스 안에 담겨있기 때문입니다. `sort`를 실행하면 인수로 넘긴 정렬 함수가 배열을 정리해주는데 이 과정에서 배열 요소끼리의 비교가 완전 무작위로 이뤄지기 때문에 블랙박스 안에 무엇이 담겨있을지는 더 예측하기 어려워집니다. 자바스크립트 엔진마다 내부 구현방식이 다르므로 이런 혼돈은 더 커지죠. 

이런 문제는 다양한 방법으로 해결할 수 있는데 [피셔-예이츠 셔플(Fisher-Yates shuffle)](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) 알고리즘은 이 중 하나입니다. 피셔-예이츠 셔플 알고리즘은 배열 끝 요소부터 시작해 앞으로 하나씩 나아가면서 해당 요소 앞에 있는 임의의 요소와 해당 요소를 바꿔치기하는 알고리즘입니다.  

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // 무작위 인덱스(0 이상 i 미만)
    // array[i]와 array[j]를 바꿔치기합니다.
    // 아래 답안에선 "구조 분해 할당(destructuring assignment)"이라 불리는 문법을 사용하여
    // 원하는 것을 구현하였는데,
    // 이 문법에 대한 자세한 내용은 이후 챕터에서 다룰 예정입니다.
    // 구조 분해 할당을 사용하지 않고 작성한 코드는 아래와 같습니다.
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

자 이제 새롭게 작성한 함수를 가지고 실행해 봅시다.

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// 1, 2, 3으로 만들 수 있는 모든 순열의 빈도를 세줍니다.
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};
for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}
// 만들 수 있는 모든 순열의 생성 빈도를 세서 출력해줍니다.
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

실행 결과는 아래와 같습니다.

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

모든 순열이 거의 유사한 빈도로 만들어진 것을 확인해 보았습니다. 

피셔-예이츠 알고리즘은 "정렬" 연산도 없기 때문에 성능상 이점도 있습니다. 
