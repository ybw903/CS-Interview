# 자료구조

### Array vs Linked List
#### Array
배열은 데이터를 물리적 주소에 순차적으로 저장하는 자료구조입니다.

데이터가 순차적으로 저장되기 때문에 데이터가 저장된 순서를 알면 바로 데이터에 접근 할 수 있습니다.

데이터를 배열의 중간에 삽입하거나 삭제 할 경우, 데이터를 한 칸씩 밀거나 삭제해야하므로 연결리스트에 비해 느립니다.

#### Linked List
연결리스트는 데이터와 다음 데이터를 가리키는 랜덤한 물리적주소를 같이 저장하는 자료구조입니다.

데이터에 접근하기 위해서는 처음 저장된 위치에서부터 접근해야 하므로 배열에 비해 속도가 느립니다.

데이터를 중간에 삽입하거나 삭제할 경우, 가리키는 주소의 위치만 바꿔주면 되므로 배열에 비해 빠릅니다.

### Stack vs Queue
#### Stack
먼저 들어간 데이터가 나중에 나오는 ```LIFO(Last In First Out)``` 의 구조를 가집니다.

#### Queue
먼저 들어간 데이터가 먼저 나오는 ```FIFO(First In First Out)``` 의 구조를 가집니다.

### Graph
정점(Vertex)와 정점 사이를 이어주는 간선(Edge)로 이루어진 자료구조입니다.

### Tree
트리는 그래프의 한 종류로 계층적 관계를 표현하기 위해 사용됩니다.

#### Graph와 Tree의 차이점
Tree는 Graph의 한 종류로 DAG(Directed Acyclic Graph)로 볼 수 있습니다. 즉 Tree는 사이클이 존재하지 않고 부모에서 자식으로 방향성이 있는 그래프로 볼 수 있습니다.

### Red Black Tree
Red Black Tree는 BST 를 기반으로하는 트리 형식의 자료구조입니다.

Red Black Tree는 Search, Insert, Delete 에 O(log n)의 시간 복잡도가 소요됩니다.

동일한 노드의 개수일 때, depth 를 최소화하여 시간 복잡도를 줄이는 것이 핵심 아이디어입니다. 

이 때, depth 가 최소가 되는 경우는 tree 가 complete binary tree 인 경우입니다.

#### Red Black Tree 정의

1. 각 노드는 Red 또는 Black이라는 색깔을 갖습니다.
2. Root node 의 색깔은 Black입니다.
3. 각 leaf node 는 Black입니다.
4. 어떤 노드의 색깔이 Red라면 두 개의 children 의 색깔은 모두 Black 입니다.
5. 각 노드에 대해서 노드로부터 descendant leaves 까지의 단순 경로는 모두 같은 수의 Black nodes 들을 포함하고 있습니다. 
6. 이를 해당 노드의 Black-Height라고 합니다. 

    cf) Black-Height: 노드 x 로부터 노드 x 를 포함하지 않은 leaf node 까지의 simple path 상에 있는 black nodes 들의 개수

#### Red Black Tree 특징
1. Binary Search Tree 이므로 BST 의 특징을 모두 갖습니다.
2. Root node 부터 leaf node 까지의 모든 경로 중 최소 경로와 최대 경로의 크기 비율은 2 보다 크지 않습니다. 이러한 상태를 balanced 상태라고 합니다.
3. 노드의 child 가 없을 경우 child 를 가리키는 포인터는 NIL 값을 저장합니다. 이러한 NIL 들을 leaf node 로 간주합니다.