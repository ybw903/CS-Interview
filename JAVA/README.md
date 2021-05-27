## JAVA

### JCF(Java Collection Framework)
#### JCF란?

다수의 데이터를 쉽고 효과적으로 처리할 수 있는 표준화된 방법을 제공하는 클래스의 집합입니다.

즉, 데이터를 저장하는 자료구조와 데이터를 처리하는 알고리즘을 구조화하여 클래스로 구현해 놓은 것입니다.

JAVA에서 Collection은 데이터의 집합, 그룹을 의미합니다.


**JCF의 장점**

1. 코드 재사용이 쉽다.
2. 프로그램의 속도와 품질을 높일 수 있다.
3. 관련성이 없는 API들의 상호운영성을 보장한다.
4. 표준적인 인터페이스를 제공하면서 새로운 API를 배우는 노력을 줄여준다.
5. 새로운 API를 직접 제작하는 노력의 낭비를 줄여준다.
6. 프로그래밍을 쉽게 한다.

#### JCF의 종류
JCF는 크게 List, Set, Map으로 구성됩니다.

**List**

순서가 있는 데이터의 집합으로, 데이터의 중복을 허용합니다.

- Array List
    
    배열을 구현한 클래스로 논리적 순서와 물리적 순서가 동일합니다.

    - 삽입

        기본 capacity는 10입니다. 기존 크기에서 50%의 크기를 더해서 새로운 크기를 산정하여 새로운 배열에 복사합니다.

    - 삭제

        삭제하는 index의 다음부터 복사하여 삭제되는 index부터 붙여넣은 후, 마지막 index의 값을 null로 변경합니다.

- LinkedList

    논리적으로 순차적인 구조지만, 물리적으로 순차적이지 않을 수 있음

    - 삽입

        가장 앞과 뒤는 빠르나 중간 삽입의 경우 index를 찾아내는데 시간이 오래 걸림

    - 삭제

        걸리는 시간은 삽입과 같으며 자기 자신을 null로 처리

- Queue

    FIFO(First In First Out): 먼저 저장된 자료가 먼저 꺼내지는 구조

    Queue는 인터페이스이기 때문에 객체 생성 불가능합니다.

    LinkedList나 PriorityQueue를 통해 객체를 생성합니다.

- Stack

    LIFO(Last In First Out): 맨 마지막에 저장된 자료가 먼저 꺼내지는 구조

    Vector를 상속받아 구현됨

- Vector

    ArrayList와 같은 구조이지만 동기화(Synchronized)된 메소드로 구성되어 있기 때문에
    MultiThread가 동시에 메소드를 실행할 수 없습니다.

**Set**

Set은 중복을 허용하지 않는 자료구조입니다.

- HashSet

    List처럼 저장 순서를 유지하지 않습니다.

    Iterator 혹은 Stream으로 순회합니다.

    ``` java
    private transient HashMap<E, Object> map;

    // Dummy Value to associate with an Object in the backing Map
    private static final Object PRESENT = new Object();
    ```

    Object 클래스를 이용하여 중복을 제거합니다.

    Present는 Value에 들어가는 Dummy값입니다.

    Key는 사용하고 Value는 사용하지 않습니다.


    - 저장방식

        객체를 저장하기 전에 hashCode() 메소드를 호출해서 해시코드를 얻어내며, 이미 저장되어 있는 객체들과 hashCode를 비교합니다.

        만일, 동일한 hashCode가 있다면 다시 equals() 메소드로 객체를 비교해서 true가 나오면 동일한 객체로 판단하고 중복저장을 하지 않습니다.

- TreeSet

    객체의 정렬을 허용합니다.

    중복을 허용하지 않으면서 정렬순으로 정렬합니다.

    내부적으로 이진 탐색 트리로 구현되어 있음.


**Map**

Key와 Value를 쌍으로 저장하는 자료구조입니다.

Key는 중복을 허용하지 않지만 Value는 중복을 허용합니다.

Key를 통해 Value에 바로 접근이 가능하므로 탐색이 빠릅니다.

- 왜 Map 인터페이스는 컬렉션 인터페이스를 상속받지 않을까요?

    '엘리먼트 그룹'이라는 컬렉션 인터페이스의 기본 개념과 맞지 않기 때문입니다.

    Set, List, Map을 구분한 후에 Set과 List의 공통된 부분이 많아, 따로 추출한 인터페이스가 Collection입니다.

- HashMap

    Key와 Value의 쌍으로 연관지어 저장합니다.

    이 때, 저장방식은 HashSet과 동일합니다.

    ```java
    static class Node<K, V> implements Map.Entry<K, V> {
        final int hash;
        final K key;
        V value;
        Node<K, V> next; //LinkedList처럼 다음 주소 값을 가짐
        ...
    }
    ```

- TreeMap

    객체의 정렬에 사용됩니다.

    내부 구조는 TreeSet과 동일하니다.

### 제네릭
#### 제네릭이란?
정의: 다양한 타입의 객체들을 다루는 메서드나 클래스에 컴파일 시의 타입 체크를 해주는 기능입니다.

효과: 객체의 타입 안정성을 높이고, 형변환의 번거로움이 줄어듭니다.

```java
List<String> stringList = new ArrayList<>();

stringList.add(1); //에러       ...
stringList.add(3.14); //에러    컴파일 되지 않는 코드
stringList.add("ok"); //ok

```

타입체크: 의도하지 않은 타입이 들어오는 것을 막습니다.

#### 제네릭의 형태
```java
// T: 타입 매개변수
// Box<T>: 제네릭 클래스
public class Box<T> {

    List<T> items = new ArrayList<>();

    public void add(T item) {
        items.add(item);
    }
}
```

```java
public static void main(String[] args) {
    Box<String> box = new Box<String>();
}
```

```java
public class Box<String> {

    List<String> items = new ArrayList<>();

    public void add(String item) {
        items.add(item);
    }
}
```

#### 제한된 제네릭

```java
public class Box<T extends Fruit> { 
    List<T> items = new ArrayList<>();

    void add(T itme) {
        items.add(itme);
    }
}
```

#### 제네릭 메서드

```java
// <T>: 타입 매개변수
// T: 리턴 타입
// foo: 메소드명
// List<T> list: 매개변수
public <T> T foo(List<T> list) {}
```

```java
// 타입 매개변수의 범위 제한
public <T> T foo(List<T extends Fruit> list) {} //X
public <T extends Fruit> T foo(List<T> list) {} //O
```

***제네릭 메서드의 타입과 제네릭 클래스의 타입은 서로 다른 것입니다.***
```java
public class Box<T> {
    public <T> void printParamClass(T t) {
        System.out.println(t.getClass());
    }
}
```

***제네릭 메서드는 제네릭 클래스가 아닌 일반 클래스에서도 사용 가능합니다.***
```java
public class MyClass {
    public <T> void printParamClass(T t) {
        System.out.println(t.getClass());
    }
}
```

#### 와일드 카드
와일드 카드는 '?' 기호로 표현하고, 어떠한 타입도 될 수 있습니다.

**아무 타입의 list를 출력하는 메서드**
```java
//<MyClass>
public static void printList(List<Object> list) {
    for (Object elem : list) {
        System.out.println(elem + " ");
    }
}
```

```java
public static void main(String[] args) {
    List<Fruit> fruits = new ArrayList<>();

    MyClass.printList(fruits); //에러
    //Required type: List<Object>
    //Provided: List<Fruit>
}
```

***정확히 Object형의 요소를 갖는 List만 들어올 수 있습니다.***

=> 와일드 카드를 사용하여 모든 타입이 들어올 수 있도록 수정
```java
public static void printList(List<? extends Object> list) {
    for (Object elem : list) {
        System.out.println(elem + " ");
    }
}
```
