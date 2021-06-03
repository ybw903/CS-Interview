## DOM과 BOM

### 웹 구성요소
 * HTML: 뼈대, 웹의 전체적인 구조
 * CSS: 옷, HTML이 실제 표시되는 방법
 * JavaScript: 기능, 웹문서를 더욱 동적으로 처리할 수 있도록 해줌

 ***JavaScript는 어떻게 확장자가 다른 HTML과 CSS파일의 내용을 읽고 수정할 수 있을까?***

 ### DOM
 DOM(Document Object Model)
  * 문서에 대한 모든 내용을 담고 있는 객체
  * 텍스트 파일로 만들어진 문서를 브라우저가 이해할 수 있는 구조로 구성한 것
  * HTML 요소 간 부자 관계를 반영하여 모든 노드를 트리 구조로 구성한 것
  * HTML, XML 문서의 프로그래밍 interface
  * 문서의 구조화된 표현(structured representation)을 제공하며 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공하여 **문서 구조, 스타일, 내용, 등을 변경 할 수 있게 도움** 

```html
<div class = "specialClass"> Text </div> 
```

HTML 요소는 HTML 문서를 구성하는 개별적인 요소를 의미합니다.

HTML 요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 유선 노드 객체로 변환됩니다.

이 때, HTML 요소의 Attribute는 Attribute 노드로 텍스트 컨텐츠는 텍스트 노드로 변환됩니다.

#### 문서 노드 (document node)
* DOM트리의 최상위에 존재하는 루트 노드로서 document 객체를 가리킵니다.
* HTML 문서당 document 객체는 유일합니다.
* DOM 트리의 루트 노드이므로 DOM 트리의 노드들에 접근하기 위한 진입점 역할을 합니다.
* 즉, 요소, 어트리뷰트, 텍스트 노드에 접근하려면 문서 노드를 통해야 합니다.

#### 요소 노드 (element node)
* HTML 요소를 가리키는 객체입니다.
* HTML 요소 간의 중첩에 의해 부자관계를 가지며, 이 부자관계를 통해 정보를 구조화합니다.
* 즉, 요소 노드는 문서의 구조를 표현합니다.

#### 어트리뷰트 노드 (attribute node)
* HTML 요소의 어트리뷰트를 가리키는 객체입니다.
* 어트리뷰트 노드는 지정된 HTML 요소의 요소 노드와 형제 관계를 갖습니다. (부모 노드와는 연결 X)
* 어트리뷰트 노드에 접근하여 어트리뷰트를 참조하거나 변경하려면 먼저 형제 노드인 요소 노드에 접근해야 합니다.

#### 텍스트 노드 (text node)
* HTML 요소의 텍스트를 가리키는 객체입니다.
* 문서의 정보를 표현합니다.
* 텍스트 노드는 요소 노드의 자식 노드이며, 자식 노드를 가질 수 없는 리프 노드입니다.
* 텍스트 노드에 접근하려면 먼저 부모 노드인 요소 노드에 접근해야 합니다.

노드 객체도 자바스크립트 객체이므로 프로토 타입에 의한 상속 구조를 갖습니다.

### DOM API
DOM은 브라우저에서 제공하는 API중 하나입니다.

DOM API를 이용해 자바스크립트로 웹 페이지를 동적으로 조작할 수 있습니다.

대표적인 DOM API

```javascript
document.querySelector()
Node.appendChild()
Node.removeChild()
```

#### 노드 취득
|HTMLCollection|NodeList|
|:---:|:---:|
|DOM API가 여러 개의 결과 값을 반환하기 위한 DOM 컬렉션 객체|
|유사 배열 객체이면서 이터러블|
|배열로 변환 후 사용이 권장됨|
|getElementByTagName,<br/>getElementByClassName|querySelectorAll|
|Live 객체|대부분의 Non-live 객체|
|forEach 사용 불가|forEach 사용 가능|

#### 노드 추가
**- innerHTML**
* 장점
    * 쉽고 간단하게 새로운 요소를 추가할 수 있습니다.
* 단점
    * 기존 요소 노드의 모든 자식 노드를 제거하고 할당한 HTML 마크업 문자열을 파싱하여 DOM을 변경합니다.

    * 요소와 요소 사이에 새로운 요소를 삽입하기 어렵습니다.

    * 크로스 사이트 스크립팅 공격에 취약합니다.

**- insertAdjacentHTML**
* 장점
    * 기존 요소를 제거하지 않으면서 위치를 지정해 추가 가능합니다.
    * 기존 자식을 모두 제거하고 자식을 새로 생성하는 innerHTML보다 빠릅니다.
* 단점
    * 크로스 사이트 스크립팅 공격에 취약합니다.

**- appendChild**
* 장점
    * 기존 요소를 제거하지 않으면서 위치를 지정해 추가 가능합니다.
    * innerHTML과 insertAdjacentHTML과 비교하여 보안 이슈가 없습니다.
* 단점
    * 자식노드를 생성해야 합니다.

👉 DOM조작을 최소한으로 하는 것은 성능향상과 연관이 있습니다.

### 렌더링 과정
브라우저의 렌더링 엔진은 클라이언트가 서버로부터 요청한 HTML부터 순차적으로 파싱하며 DOM을 생성해 나갑니다.

이 때, 렌더링 엔진은 DOM을 생성해 나가다가 CSS를 로드하는 링크 태그나 스타일 태그를 만나면 CSSOM을 생성하게 됩니다. CSSOM은 DOM과 비슷한 트리 구조의 오브젝트 모델입니다.

이후 CSS파싱을 완료하면 HTML파싱이 중단된 지점부터 다시 HTML을 파싱하기 때문에 DOM생성을 재개합니다.

DOM과 CSSOM 생성이 끝나면 이 둘을 합쳐 렌더트리를 구성합니다. 이 떄 렌더트리는 렌더링을 위한 트리구조이기 때문에 렌더링에 포함되지 않는 노드들(ex. metaTag, scriptTag, display='none'등)과 같은 것들을 제외하고 구성이 됩니다.

CSS파싱 과정과 마찬가지로 렌더링 엔진은 HTML을 한 줄씩 순차적으로 파싱하며 DOM을 생성하다 스크립트 태그를 만나면 DOM생성을 일시 중단합니다.

브라우저는 자바 스크립트 코드를 실행하기 위해 렌더링엔진에서 부터 자바 스크립트 엔진으로 제어권을 넘겨줍니다.

이후 자바스크립트 파싱과 실행이 종료되면 렌더링 엔진으로부터 다시 제어권을 넘겨 HTML파싱이 중단된 지점부터 DOM을 생성합니다.

만약 자바스크립트 코드에 의해 DOM이나 CSSOM이 변경되는 경우, DOM과 CSSOM을 다시 렌더트리로 결합하고 이를 기반으로 레이아웃과 페이트 과정을 거쳐 브라우저 화면에 렌더링 되게 됩니다. 이를 리플로우와 리페인트라고 합니다.

***CSS 태그를 상단에 위치시키는 이유***
* 사용자가 흰 화면을 응시하는 시간을 줄이기 위해(CSS는 렌더링 차단 리소스로 취급됨)
* Link를 이용하여 스타일 시트를 다운 받는 경우, 최대한 빠르게 다운 받기 위해
    
    => 브라우저는 모든 외부 스타일 시트가 다운로드 후 CSSOM트리가 구성될 때까지 웹 페이지 렌더링을 차단

***Script 태그를 하단에 위치시키는 이유***
* HTML 파서는 script 태그를 만나면 파싱을 멈추고 스크립트를 읽기 때문에 웹페이지의 로딩이 그만큼 늦춰질 수 있습니다.

* 생성되지 않은 DOM노드를 읽거나 조작하는 것이 불가능하기 때문에 예상치 못한 오류가 발생할 수 있습니다.

### 렌더링의 문제점
* 동적 UI 관리에 약합니다.
    
    -> DOM트리가 수정될 때마다 새로운 렌더 트리와 레이아웃을 생성하고 Repaint합니다.

* 단 하나의 요소가 바뀌어도 전체 페이지 정보를 갱신합니다. 

* 하나의 페이지에 많은 동작이 이뤄지는 SPA(Single Page Application)에서 비효율적입니다.

### Virtual DOM
이전 DOM과 가상 DOM에 있는 내용을 비교하여 바뀐 부분만 실제 DOM에 적용합니다.

React에서는 변경된 부분(diff)만을 계산하여 실제 DOM에 적용합니다.

-> 결과적으로 브라우저는 **불필요한 렌더링 횟수를 줄이고 한번만 렌더링 할 수 있습니다.**

### BOM
BOM(Browser Object Model)
* 웹 브라우저 환경의 다양한 기능을 객체처럼 다루는 모델
* 대부분의 브라우저에서 구현되어 있지만, 정의된 표준이 없어 브라우저 제작사마다 세부사항이 다릅니다.
* Window 객체는 자바스크립트 최상위 객체이자 전역 객체이면서 모든 객체가 소속된 객체

    -> var 키워드로 선언한 일반 변수도 모두 window 객체의 속성이 됩니다.
    
    -> 최상위 객체이기 때문에 생략 가능합니다. 

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

## Prototype

### Prototype 이해하기
* 자바스크립트에 클래스는 없습니다.

* 자바스크립트에서 '복사'를 통한 상속은 없습니다.

* Prototype은 클래스, 객체의 내용 복사 없이도 상속을 구현할 수 있게 해주는 방법입니다.

* Prototype은 '연결'입니다.

***클래스가 없다면, 자바스크립트는 객체를 어떻게 설계대로 찍어낼 수 있을까?***

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        console.log(`${this.name}: hello!`);
    }
}
```

```javascript
function Person(name) {
    this.name = name;
    this.sayHello = function() {
        console.log(`${this.name}: hello!`);
    }
}
```

***실제로 실행되는 코드는 클래스가 아니다.***


```javascript
function Person(name) {
    this.name = name;
    this.sayHello = function() {
        console.log(`${this.name}: hello!`);
    }
}

const james = new Person('james');
```
***클래스가 아니라면 return이 없는데 객체가 어떻게 생성되는 걸까?***

```javascript
const james = new Person('james');
```
1. new 연산자가 새로운 빈 객체를 메모리 상에 생성함.

```javascript
function Person(name) {
    this.name = name;
    this.sayHello = function() {
        console.log(`${this.name}: hello!`);
    }
}
```
2. 생성된 빈 객체가 this에 바인딩 됨

3. this 객체의 속성을 채우는 동작이 수행됨

4. return 하는 것이 없다면 그렇게 만들어진 this가 return됨

***복사 없이 어떻게 상속을 수행할 수 있는 것인가?***

```javascript
class Person {
    constructor (name){
        this.name = name;
    }

    sayHello() {
        console.log(`${this.name}: hello!`);
    }
}

class Crew extends Person {
    constructor(name) {
        super(name);
    }

    doCoding() {
        console.log(`${this.name}: coding...!`);
    }
}
```
Person + Crew

내용이 '복사'된 객체

=> 자바스크립트에서는 불가능

#### 객체간의 연결 관계 이해하기
.`__proto__ `= 객체와 객체를 연결하는 링크

1. 다른 객체를 바탕으로 만들어진 객체라면

객체는 자신의 원형이라고 할 수 있는 객체가 있다면 그 객체를 가리키는 `__proto__` 링크를 자동으로 가짐

```javascript
const newObj = Object.create(oldObj);
newObj.__proto__ === oldObj
```

2. 그냥 객체가 아니라 함수라면

함수가 생성될 때, 함수의 prototype객체가 같이 만들어짐.

함수의 prototype속성은 만들어진 함수의 prototype객체를 가리키고 함수의 prototype의 constructor속성은 함수를 가리키는 순환참조 관계를 가지고 있습니다.

3. new + 함수로 만들어진 객체라면

만들어진 새로운 객체의 `__proto__`링크는 앞서 생성된 함수의 prortotype객체을 가리킵니다.

### Prototype Chaining을 이해하기

Prototype Chaining: `__proto__`를 따라 탐색하기

#### 프로토타입 체이닝과 Property 할당

```javascript
function sayHello() {
    console.log(`${this.name}: hello!`);
}

function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = sayHello;

const james = new Peroson('james');

james.sayHello = function() {
    console.log('hi~!');
};
```
**james객체에 sayHello 추가?**

**Person.prototype.sayHello 덮어씌우기?**

***=> 상황에 따라 다르게 적용됩니다.***

```javascript
Object.defineProperty(Person.prototype, "sayHello", {
    writable: false
    ...
})

// 엄격 모드: 에러
// 비엄격 모드: 아무일 없음
```

Person.prototype.sayHello가 setter일 경우, 그냥 setter를 실행

```javascript
Object.defineProperty(Person.prototype, "sayHello", {
    writable: true
    ...
})

// james.sayHello추가
```

이 방법이 적용될 경우, Person타입 prototype객체의 sayHello에 접근할 수 있는 방법이 사라집니다.

이를 가려짐이라고 부릅니다.