## 디자인패턴

### 싱글톤

#### 개념

클래스의 인스턴스를 하나만 생성하고, 어디서든 그 인스턴스를 참조할 수 있도록 하는 패턴입니다.

생성자가 여러 번 호출되더라도 실제로 생성되는 객체는 하나임을 의미합니다.

#### 쓰는 이유

1. 고정된 메모리 영역을 가지고 하나의 인스턴스만 사용하기 때문에 메모리 낭비를 방지 할 수 있습니다.

2. 싱글톤 클래스의 인스턴스는 전역이기 때문에 다른 클래스의 인스턴스들이 데이터를 공유하기 쉽습니다.

3. DBCP(Database Connection Pool)처럼 공통된 객체를 여러 개 생성해야 하는 상황에 많이 사용합니다.

#### 구현

1. Eager initialization

    ```java
    public class EagerSingleton {
        private static EagerSingleton instance = new EagerSingleton();

        private EagerSingleton(){}

        public static EagerSingleton getInstance() {
            return instacne;
        }
    }
    ```

    장점
    
     빠르다
    
    단점
    
    (1) 클라이언트에서 사용하지 않더라도 인스턴스가 항상 생성됩니다.

    (2) 예외 처리를 할 수 있는 방법이 없습니다.

2. Static block initialization

    ```java
    public class StaticBlockSingleton {
        private static StaticBlockSingleton instance;

        private StaticBlockSingleton(){}

        static {
            try {
                instance = new StaticBlockSingleton();
            } catch (Exception e) {
                throw new RuntimeException("싱글톤 객체 생성 오류");
            }
        }

        public static StaticBlockSingleton getInstance() {
            return instacne;
        }
    }
    ```

    static 영역으로 인스턴스의 생성위치를 옮김.

    예외처리가 가능해졌지만, 여전히 클라이언트에서 사용하지 않더라도 인스턴스가 항상 생성됩니다.

3. Lazy initialization

    ```java
    public class LazyInitializationSingleton {
        private static LazyInitializationSingleton instance;

        private LazyInitializationSingleton() {}

        public static LazyInitializationSingleton getInstance() {
            if(Object.isNull(instance)) {
                instance = new LazyInitializationSingleton();
            }
            return instance;
        }
    }
    ```

    인스턴스가 Null값일 때, 인스턴스를 생성.

    인스턴스가 사용되는 경우에만 생성하므로, Eager initialization의 단점을 보완하지만
    멀티스레드 환경에서 스레드 세이프 하지 않는 문제가 발생합니다.

4. Thread safe initialization

    ```java
    public class ThreadSafeSingleton {
        private static ThreadSafeSingleton instance;

        private ThreadSafeSingleton() {}

        public static synchronized ThreadSafeSingleton getInstance() {
            if(instance == null) {
                instance = new ThreadSafeSingleton();
            }
            return instance;
        }
    }
    ```
    
    synchronized키워드를 getInstance()메소드에 붙여 여러 스레드가 동시에 사용할 수 없도록 막아줌.

    하지만 하나의 스레드만 getInstance() 메소드를 사용하고 나머지 스레드는 대기상태가 되므로 많이 느려집니다.

5. Double-Checked Locking

    ```java
    public class DoubleCheckedLockingSingleton {
        private static DoubleCheckedLockingSingleton instance = null;

        private DoubleCheckedLockingSingleton() {}

        public static DoubleCheckedLockingSingleton getInstance() {
            if(Object.isNull(instance)) {
                synchronized(DoubleCheckedLockingSingleton.class) {
                    if(Object.isNull(instance)) {
                        instance = new DoubleCheckedLockingSingleton();
                    }
                }
            }
            return instance;
        }
    }
    ```

    Null 체크를 synchronized키워드 블록 밖에서 한 번, 안에서 한 번 총 두번 실행합니다.

    밖에서 하는 체크는 인스턴스가 있는 경우 빠르게 리턴하기 위해서 사용하고 안쪽에서 하는 체크는 인스턴스가 생성되지 않은 경우 하나의 인스턴스만 생성하기 위해 사용합니다.

    하지만 들여쓰기가 길어져 보기 불편한 점이 있습니다.

6. Bill Pugh Solution

    ```java
    public class BillPughSingleton {
        private BillPughSingleton() {}

        private static class SingletonHelper {
            private static final BillPughSingleton INSTANCE = new BillPughSingleton();
        }

        public static BillPughSingleton getInstance() {
            return SingletonHelper.INSTANCE;
        }
    }
    ```

    Double Checked에 비해 구현이 간단합니다.

    Lazy Loading이 가능합니다.

    Thread safe합니다.

### 전략 패턴

#### 개념

디자인 패턴 중 행위 패턴의 하나로, 객체가 할 수 있는 행위들 각각을 전략으로 만들어 놓고 사용하며, 동적으로 전략 수정이 가능한 패턴입니다.

> **전략패턴** <br/> 
    동일 계열의 알고리즘 군을 정의하고 각 알고리즘을 캡슐화하며, 이들을 상호교환이 가능하도록 합니다. <br/>
    - GoF 디자인패턴

#### 요소
**Context**
- 전략패턴을 이용하는 역할을 수행
- 필요에 따라 동적으로 구체적인 전략을 바꿀 수 있도록 한다. (DI)

**Strategy**
- 인터페이스로 외부에서 동일한 방식으로 알고리즘을 호출하는 방법을 명시한다.

**ConcreateStrategy**
- 전략 패턴에서 명시한 알고리즘을 실제로 구현한 클래스

#### 전략 패턴 in JDK
```java
public interface Comparator<T> {
    int compare(T o1, T o2);
    ...
}
```
```java
public class studentCompareByScore implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return s1.getScore() - s2.getScore();
    }
}
```
비교 전략을 sort라는 컨텍스트에서 사용.

코드의 수정 없이 확장을 할 수 있음.

####  전략 패턴 vs Template-Method패턴  

둘 다 OCP를 준수하기 위해 사용되는 디자인 패턴입니다.

하지만 전략 패턴은 Compositioin(has-a)으로 볼 수 있고, Template-Method 패턴은 상속(is-a)로 볼 수 있습니다. 