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

## HTTP
웹상에서 클라이언트와 서버 간 통신을 위한 프로토콜입니다.

HTTP /0.9~/2는 기본적으로 TCP프로토콜을 사용합니다.

### HTTP /0.9

```
GET /mypage.html
```

```
<HTML>
Simple Page
</HTML>
```

* GET 메서드만 존재

### HTTP /1.0

```
GET /mypage.html HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)
```

```
200 OK
Date: Tue, 15, Nov 1994 08:12:31 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/html
<HTML>
Simple Page with an Image
<IMG SRC ="/myimage.gif">
</HTML>
```
* 헤더가 추가됨

* 버전, 상태코드, 컨텐츠타입등 추가하여 요청, 응답할 수 있음

* 하나의 요청에 하나의 응답만 처리
    
    => 매번 새로운 연결로 성능 ⇩, 서버 부하 비용 ⇧

### HTTP /1.1

* Persist Connection

    지정한 timeout동안 커넥션을 닫지 않는 방식

* Pipelining

    하나의 커넥션에서 응답을 기다리지 않고 순차적인 여러 요청을 연속적으로 보내 그 순서에 맞춰 응답을 받는 방식으로 지연시간을 줄이는 방법

    ***!!! Head Of Line Blocking***

    첫번째 요청을 서버에서 처리하는데 많은 시간이 소요되어 다음 요청들이 처리되지 않는 문제 발생

    ***!!! Header 구조의 중복***

    비슷한 Header구조를 가지는 요청이 중복될 수 있음 => 필요없는 데이터 발생

### HTTP /2

2015년에 발표되었습니다.

기존 HTTP/1.X 버전의 성능 향상에 초점을 맞춘 프로토콜입니다.

표준의 대체가 아닌 확장을 목표로 하였습니다.

* HTTP 메시지 전송 방식의 변화

    ⇨ 바이너리 프레이밍 계층 사용

    ⇨ 파싱, 전송속도 ⇧, 오류 발생 가능성 ⇩

    * Request and Response multiplexing

        ⇨ Head Of Line Blocking 해결

* Stream Prioritization

    ⇨ 리소스간 우선 순위를 설정 가능

* Server Push

    클라이언트가 요청하지 않은 리소스를 서버에서 알아서 전달해줌

    ⇨ 클라이언트가 다음에 요청할 리소스를 예측해서 전달

* Header Compression

    ⇨ 헤더의 크기를 줄여 페이지 로드 시간 감소

    Static, Dynamic 테이블 도입

    중복 발생 시, 중복된 내용은 인덱스 검출, 중복되지 않은 내용은 허프만 인코딩

### QUIC

* 전송 계층 프로토콜

* 2013년에 공개

* 현재 구글 관련 제품 대부분의 기본 프로토콜

* ***UDP기반 프로토콜***

    ⇨ TCP헤더는 신뢰성을 확보할 수 있지만 지연을 줄이기 힘든 구조입니다.

    ⇨ UDP헤더는 데이터 전송에 집중한 설계

    ⇨ 별도의 기능 X, 원하는 기능 구현 O, TCP의 지연을 줄이면서 TCP만큼 신뢰성 확보 가능

* 전송 속도 향상

    첫 연결 설정에서 필요한 정보와 함께 데이터를 전송

    ⇨ 연결 성공 시 설정을 캐싱하여 다음 연결 때, 바로 성립 가능

    * Connection UUID라는 고유한 식별자로 서버와 연결

        ⇨ 커넥션 재수립 필요 X


* TLS기본 적용

* IP Spoofing / Replay Attack 방지

    ⇨ 보안성 향상

* 독립 스트림

    ⇨ 향상된 멀티플렉싱 기능 (TCP프로토콜에 존재하는 Head Of Line Blocking을 해결)

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

