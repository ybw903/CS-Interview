# Network

## OSI 7 Layer
OSI 7 Layer는 **네트워크 프로토콜이 통신하는 구조를 7개의 계층으로 분리하여 각 계층간 상호 작동하는 방식을 정해 놓은 것** 입니다.

#### 애플리케이션 계층

#### 표현 계층

#### 세션 계층

#### 트랜스포트 계층

#### 네트워크 계층

#### 링크 계층

#### 물리 계층


## TCP/UDP

### Transport Layer

End Point간 **신뢰성** 있는 데이터 **전송**을 담당하는 계층

* 신뢰성: 데이터를 순차적,안정적인 전달
* 전송: 포트 번호에 해당하는 프로세스에 데이터를 전달

#### 전송 계층이 없다면? (전송 계층의 중요성)

* 데이터의 순서가 뒤섞임

* Flow(흐름 문제)
    
    송,수신자 간의 데이터 처리 속도 차이로 인해 발생되는 문제

* Congestion(혼잡 문제)

    네트워크의 데이터 처리 속도로 인해 발생되는 문제

### TCP

* 신뢰성있는 데이터 통신을 가능하게 해주는 프로토콜

* 특징: Connection 연결 (3-Way-handshake) - 양방향 통신

* 데이터의 순차 전송을 보장

* Flow Control (흐름 제어)

* Congestion Control (혼잡 제어)

* Error Detection (오류 감지)

#### 세그먼트(Segment) - TCP 프로토콜의 PDU

#### 3-Way handshake (Connection 연결)

1. SYN 비트를 1로 설정해 패킷 송신 (Client -> Server)

2. SYN, ACK비트를 1로 설정해 패킷 송신 (Server -> Client)

3. ACK 비트를 1로 설정해 패킷 송신 (Client -> Server)


#### TCP의 데이터 전송 방식
 
1. Client가 패킷 송신

2. Server에서 ACK 송신

3. ACK를 수신하지 못하면 재전송

#### 4-Way handshake (Connection close)

1. 데이터가 전부 송신한 Client가 FIN 송신

2. Server가 ACK 송신

3. Server에서 남은 패킷 송신 (일정 시간 대기)

4. Server가 FIN 송신

5. Client가 ACK 송신

#### TCP의 문제점

 * 전송의 신뢰성을 보장하지만....

 * 매번 Connection을 연결해서 시간 손실 발생 (3-way-handshake)

 * 패킷을 조금만 손실해도 재전송

 ### UDP (User Datagram Protocol)

 * TCP보다 신뢰성이 떨어지지만 전송 속도가 일반적으로 빠른 프로토콜
    
    (순차전송 X, 흐름제어 X, 혼잡제어 X)
 
 * Connectionless (3 way-handshake X)

 * Error Detection

 * 비교적 데이터의 신뢰성이 중요하지 않을 때 사용(ex. 영상 스트리밍)

 #### User Datagram - UDP 프로토콜의 PDU

