## This

### This란?
일반적으로 객체지향에서 This는 함수에 속해있는 자기 자신과 관련있습니다.

하지만 JavaScript에서 함수는 일급 객체입니다.

1. 변수나 데이터에 저장 할 수 있고
    ```javascript
    const myFunc = func
    ```

2. 함수의 인수로 전달 할 수 있고
    ```javascript
    function func1(func2){}
    ```

3. 함수의 반환 값으로 사용 할 수 있습니다.

    ```javascript
    function func1() {
        return func1
    }
    ```

JavaScript의 모든 함수는 this를 갖고 있습니다.

그리고 함수가 호출 될 때, 상황에 따라 this가 가리키는 객체가 결정됩니다.

이렇게 상황에 따라 this가 가리키는 객체가 동적으로 결정되는 것을 This가 객체에 **바인딩**된다고 합니다.

***!!참고***

**자바스크립트 엔진**은 프로그램이 실행되면 모든 **실행 가능한 코드**를 평가해서 **실행 문맥**을 만듭니다. 

※ 실행 가능한코드: 전역 코드, 함수 코드, eval코드

※ 실행 문맥: 렉시컬 환경 컴포넌트, <u>디스 바인딩 컴포넌트</u> ...

프로그램이 실행되면 먼저, 자바스크립트 엔진은 먼저 전역 코드를 평가해서 전역 실행 문맥을 만듭니다. 이 때, 중간에 함수가 실행이 되면, 전역코드를 실행을 잠깐 멈추고 함수 실행 문맥을 만듭니다. 이 때, 디스 바인딩 컴포넌트의 값이 결정됩니다.

### This Binding Rules

#### 기본 바인딩

JavaScript함수를 호출하는 가장 기본적인 방법은 바로 단독실행하는 것입니다.

함수를 단독실행하게 되면 this는 기본적으로 전역객체에 바인딩 됩니다.

따라서 브라우저환경에서는 this는 전역객체인 window에 바인딩 됩니다. 

하지만 엄격모드를 사용할 경우, this는 전역객체는 기본 바인딩에서 제외가 됩니다.

따라서 이 경우, this는 바인딩 될 객체가 존재하지 않기 때문에 undefined값을 가지게 됩니다.

Node환경에서 마찬가지로 this는 전역 객체에 바인딩 됩니다.

따라서 Node환경의 전역객체는 global이므로 global에 바인딩 됩니다.

이 때, 함수코드가 아닌 전역코드에서 this를 호출하면 빈 객체가 호출됩니다.

이 빈 객체는 모듈객체에 있는 exports객체와 동일합니다.

#### 암시적 바인딩

JavaScript에서 함수는 단독으로 호출될 수 있을 뿐만 아니라 객체의 메소드로도 호출 될 수 있습니다.

이 경우, 메소드는 .바로 앞의 객체에 바인딩 됩니다.

이러한 바인딩을 암시적 바인딩이라고 부릅니다.

이런 암시적 바인딩을 사용할 때, 주의해야할 경우가 있습니다.

```javascript
const obj = {
    name: "test",
    getName() {
        return this.name;
    },
};

function showReturnValue(callback) {
    console.log(callback());
}

showReturnValue(obj.getName); //undefined
```

JavaScript에서 객체를 할당한 변수는 해당 객체의 참조값을 저장합니다.

이 때, 함수의 인수로 참조값을 넘겨주면 함수는 이 참조 값을 복제해서 사용합니다.

따라서 같은 객체를 참조하는 또 다른 변수를 만들어서 함수 안에서 사용하게 되는 것입니다.

같은 객체를 참조하는데 이런 문제가 발생하는 원인은 객체에 .연산을 통해 객체의 프로퍼티에 접근할 때, 참조 타입(Reference Type)을 반환해주기 때문입니다.

---
***!!참조 타입(Reference Type)***

(base, name, strict)

base: 객체

name: 프로퍼티 이름

strict: 엄격모드 true

---
obj.getName: (obj, getName, true)

obj.getName()을 실행하면 함수는 참조타입에 있는 객체를 찾아 바인딩 됩니다.

이러한 바인딩을 암시적 바인딩 이라고 부릅니다.

이러한 프로퍼티를 함수의 매개변수로 전달할 경우, 프로퍼티의 참조값만 남게 되어 문제가 발생됩니다.

#### 명시적 바인딩

JavaScript에서는 this를 특정 객체에 암시적으로 바인딩 할 뿐만 아니라 명시적으로 바인딩 하는 방법 역시 제공합니다. 이를 통해 this가 소실되는 문제를 해결 할 수 있습니다.

```javascript
call(context, arg1, arg2, ...)
```

```javascript
apply(context, args)
```

call과 apply를 사용하면 this를 바인딩할 객체를 지정한 상태로 함수를 호출 할 수 있습니다.

```javascript
func.bind(context,arg1,arg2,...)
```

bind를 사용할 경우, this가 참조하는 객체를 고정시켜줍니다.

bind메서드가 반환하는 특수한 객체가 있는데, 이 객체는 this가 항상 특정 객체에 바인딩 되어 있는 함수처럼 행동합니다.

이렇게 항상 같은 객체에 바인딩되도록 강제하는 방법을 hard binding이라고도 부릅니다.

#### new 바인딩

JavaScript함수를 new 연산자와 같이 호출하게 되면, 생성자 함수로써 역할을 수행할 수 있습니다.

1. 새로운 객체 생성

2. 함수 코드 실행

3. 새로 생성한 객체 반환

그리고 이 과정에서 this는 새로 생성된 객체에 바인딩됩니다.

```javascript
{
    obj = {} //create new object
    this = obj // bind

    this.name = "name"

    return this
}
```

이렇게 new 연산자로 함수를 호출할 때, this가 바인딩되는 규칙을 new바인딩이라고 합니다.

new 바인딩 > 암시적 바인딩 > 명시적 바인딩 > 기본 바인딩

바인딩 규칙이 중복으로 적용될 때, 다음과 같은 순서를 따릅니다.

### 화살표함수에서 this

화살표 함수는 기존의 함수와 this를 바인딩 하는 방법이 다릅니다. 또한 그 외에도 다양한 다른 점들이 존재합니다.

```javascript
const obj = {
    name: "name",
    showNameInSec(sec) {
        setTimeout(() => {
            console.log(this.name);
        }, sec);
    },
};

obj.showNameInSec(1000); // name
```
화살표 함수를 사용하는 가장 큰 목적중 하나는 상위 실행 문맥을 유지하기 위함입니다.

화살표 함수안에서 this는 선언될 당시의 상위 스코프에 해당하는 실행 문맥의 디스 바인딩 컴포넌트를 참조합니다.

이런 특징을 갖는 this를 렉시컬 this라고 부릅니다.