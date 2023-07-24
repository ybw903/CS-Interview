## AES

- [준문서](https://csrc.nist.gov/files/pubs/fips/197/final/docs/fips-197.pdf)

* Rijndael 알고리즘 채택

  - Rijndael 알고리즘은 크게 보아 네단계 수행

    1. Key Expansion

       - 128, 192 또는 256비트 길이인 하나의 주 암호화 키를 받아서 아래 라운드들에서 사용할 여러 개의 128비트 라운드 키를 생성.

    2. 0 라운드

       - 위의 단계에서 생성한 라운드 키 중 첫번째 키를 사용, AddRoundKey를 한 번 실행.

    3. 1~(9, 11, 13) 라운드

       - SubBytes, ShiftRows, MixColumns, AddRoundKey를 순서대로 실행. 이것을 AES-128, 192, 256에 따라 각각 9번, 11번, 13번 반복.

    4. 마지막 (10, 12, 14)번째 라운드

       - SubBytes, ShiftRows, AddRoundKey를 순서대로 실행한다.

* S-box

  - 바이트의 앞쪽 4비트 -> 행
  - 바이트의 뒤쪽 4비트 -> 열
  - 해당 행&열의 값으로 바꿈

* SubBytes

  - State의 각 바이트를 S-box에 따라 다른 바이트로 substitution

  * 2^8 가지의 입력값이 존재하여 2^8가지의 출력값이 존재

  * 비선형을 제공 -> 차분 공격, 선형 공격에 저항성을 가짐

* ShiftRows

  - 확산 효과를 제공

  * 128비트=16바이트 블럭을 4x4 바이트 행렬로 봄.

  - 4개의 행은 각각 왼쪽으로 Shift.

  - 16바이트를 행 우선으로 배열한 다음, 두번째 줄은 왼쪽으로 한 칸, 세번째 줄은 두 칸, 네번째 줄은 세 칸 만큼 민다. 첫번째 줄은 변화가 없다.

* MixColumns

* AddRoundKey

  - 128비트 블럭에 128비트 라운드 키(네 워드를 이어붙여 만든)를 XOR한다.

* AES 암호화된 결과 데이터는 이진 데이터이기 때문에 데이터 교환 시 불편한 경우가 많아 대부분 암호화된 결과 데이터를 BASE64로 인코딩해서 나온 플레인 텍스트를 사용

* 컴퓨터 파일이나 각종 디스크 암호화에 적절한 암호화 방식

* AES가 블럭 암호화 알고리즘인 만큼 다른 모든 블럭 암호화 알고리즘처럼 패딩(padding)하여 블럭의 빈 자리를 채울 필요가 있음. 일반적으로 PKCS#5와 PKCS#7에 정의된 패딩 알고리즘이 널리 사용.

### ECB (Electronic Code Block)

- 가장 단순한 모드로 블록단위로 순차적으로 암호화 하는 구조.

* 한 개의 블록만 해독되면 나머지 블록도 해독이 되는 단점. (Brute-Force Arttack, Dictionary Attack)

* 암호문이 블록의 배수가 되기 때문에 복호화 후 평문을 알기 위해서 Padding을 해야한다.

### BCM (Block Cipher Mode)

### CBC (Cipher Block Chaining)
