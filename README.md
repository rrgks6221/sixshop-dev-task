# SixShop dev task

### 구현 기능

> 상점 개설을 위한 사용자 서비스
> 각 상점에 대한 로그인 기능 및 사용자 정의 필드 정의 및 수정

<br>

### 환경변수

> 일반적으로 환경변수는 .gitignore파일에 넣어 저장소에 올라가지 않게 해야하나 이 과제에서만 서버 실행을 위해 넣지 않음

<br>

### 서버 실행 방법

> 1. git clone https://github.com/rrgks6221/sixshop-dev-task.git
> 2. sixshop-dev-task/app 경로에서 npm i
> 3. sixshop-dev-task/app 경로에서 npm start (개발 단계에선 npm run dev 명령으로 하는것이 일반적이나 개발의 편의성을 위해 npm start로 처리함)
> 4. 데이터베이스는 로컬에서 구현했으며 db config는 환경변수에 있음
> 5. 데이터베이스를 클라우드로 배포한 것이 아니기때문에 각 로컬에서 만들어줘야함(생성 query문은 DB-query를 통해 정리했음)

<br>

### 기능

> 각 기능에 대한 설계 문서는 Issues를 통해 정리

<br>

### API 명세

> API 명세서는 sixshop-dev-task/apis 경로에 md 파일로 정리했으며 시간상 store, dash-board 경로에 대한 명세서는 작성하지 못하고 root 경로의 기능만 명세서를 작성함

<br>

### git flow

> feature => master
> 기능 브랜치를 만든 뒤 해당 브랜치에서 작업한 뒤 기능에 대한 구현이 끝나면 master 브랜치로 pull request를 보내 merge
