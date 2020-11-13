# REST API

### 1. API 목록

#### 인증 API

| 리소스                    | POST                                  | GET  | PUT  | DELETE      |
| ------------------------- | ------------------------------------- | ---- | ---- | ----------- |
| auth/signup/              | 회원가입<br />& 이메일 인증           | X    | X    | X           |
| auth/login/               | 로그인<br />반환: 토큰                | X    | X    | X           |
| auth/logout/              | 로그아웃                              | X    | X    | X           |
| auth/check/               | 아이디 중복체크<br />반환: True/False | X    | X    | X           |
| auth/callback/            | 카카오 로그인                         | X    | X    | X           |
| api/user/  (관리자용)     | X                                     | X    | X    | 유저 지우기 |
| rest-auth/password/reset/ | 이메일로 비밀번호 변경 url 보내기     | X    | X    | X           |



#### 물고기 API

| 리소스                      | POST                                | GET                                                          | PUT                      | DELETE                   |
| --------------------------- | ----------------------------------- | ------------------------------------------------------------ | ------------------------ | ------------------------ |
| api/fishes/                 | 물고기 추가                         | 물고기 전체 목록                                             | 수정                     | 삭제                     |
| api/fishes?keyword=         | X                                   | 물고기 이름으로 검색                                         | X                        | X                        |
| api/fishes/1/               | X                                   | 1번 물고기 정보<br />& 로그인 한 유저가 1번 물고기 잡은적 있는지 | X                        | X                        |
| api/fishes/1/catches/       | X                                   | 로그인 한 유저의 1번 물고기 낚시 목록                        | X                        | X                        |
| api/fishes/1/catch/         | 1번 물고기 낚시 목록에 등록         | 낚시 된 물고기 정보                                          | 낚시 된 물고기 정보 수정 | 낚시 된 물고기 정보 삭제 |
| api/users/  (관리자용)      | X                                   | 유저 전체 목록                                               | X                        | X                        |
| api/users/1/  (관리자용)    | X                                   | 1번 유저 정보                                                | X                        | X                        |
| api/users/catches/          | 유저가 낚시한 물고기 종류 전체 목록 | X                                                            | X                        | X                        |
| api/users/catches/?keyword= | X                                   | 유저가 낚시한 물고기 종류 이름으로 검색                      | X                        | X                        |
| api/fishdiscriminations/    | 물고기 판별                         | X                                                            | X                        | X                        |



#### 지도 API

| 리소스                   | POST | GET                                                | PUT  | DELETE |
| ------------------------ | ---- | -------------------------------------------------- | ---- | ------ |
| api/spots/               | X    | 전체 낚시터 위치 정보<br>(로딩 시간 너무 오래걸림) | X    | X      |
| api/spots/?keyword=      | X    | 물고기로 낚시터 검색                               | X    | X      |
| api/spots/1/             | X    | 1번 낚시터 디테일                                  | X    | X      |
| api/userfishes/          | X    | 낚시된 전체 물고기 목록                            | X    | X      |
| api/userfishes/?keyword= | X    | 물고기 이름으로 잡힌 물고기 목록 검색              | X    | X      |
| api/userfishes/1/        | X    | 낚시된 물고기 디테일                               | X    | X      |





### 2. 인풋 & 아웃풋

1. auth/signup/

   - 성공: is_active가 False(이 상태로 로그인 하면 404 에러)

   ![image-20201029104320195](REST%20API.assets/image-20201029104320195.png)

   ![image-20201029104410207](REST%20API.assets/image-20201029104410207.png)

   

   - 에러: username이 8자보다 짧거나, password가 4자보다 짧으면 422 에러(자세한건 수정 가능)

   ![image-20201029105406594](REST%20API.assets/image-20201029105406594.png)



2. auth/login/

   - 성공: 이메일 인증 후 로그인

   ![image-20201029104627496](REST%20API.assets/image-20201029104627496.png)



3. auth/logout/

   - 정상: 토큰 필요

   ![image-20201029110115017](REST%20API.assets/image-20201029110115017.png)



4. auth/check/

   - 성공: True - 같은 이름의 유저 있으면, False - 같은 이름의 유저 없으면

   ![image-20201029114146874](REST%20API.assets/image-20201029114146874.png)



5. auth/callback/ 
   
   - access_token 필요
   
   ![image-20201113101641461](REST%20API.assets/image-20201113101641461.png)



6. api/fishes/ 

   - Method = GET

   ![image-20201029115054459](REST%20API.assets/image-20201029115054459.png)

   

   - Method = POST

   ![image-20201029115623570](REST%20API.assets/image-20201029115623570.png)
   
   
   
   - Method = PUT - fish_id 필요, 이미지 파일은 일단 수동으로 변경해야
   
     ![image-20201104104353908](REST%20API.assets/image-20201104104353908.png)
   
     
   
   - Method = DELETE - fish_id 필요, 이미지 파일 삭제 일단 수동으로
   
     ![image-20201104105911068](REST%20API.assets/image-20201104105911068.png)



7. api/fishes?keyword=호호

   ![image-20201029120011945](REST%20API.assets/image-20201029120011945.png)



8. api/fishes/1/

   - 성공: 로그인 되어있어야 함 - record(True: 잡은 적 있음, False: 잡은 적 없음)

   ![image-20201029120627257](REST%20API.assets/image-20201029120627257.png)

   

   - 에러: 로그인 되어 있지 않으면 401

   ![image-20201029120822767](REST%20API.assets/image-20201029120822767.png)



9. api/fishes/1/catches/

   - 성공: 로그인 후 가능

   ![image-20201029121213547](REST%20API.assets/image-20201029121213547.png)

   

   - 에러: 로그인 안하면 401, 잡은 물고기 없으면 404(잡은 물고기 없으면 애초에 이 api 사용 불가능 할듯?) 

   

10. api/fishes/1/catch/

    - Method = POST - 이미지 파일 필수, 로그인 필수

    인풋

    ![image-20201112173247037](REST%20API.assets/image-20201112173247037.png)

    ![image-20201112173319172](REST%20API.assets/image-20201112173319172.png)

    

    아웃풋

    ![image-20201029133035505](REST%20API.assets/image-20201029133035505.png)

    

    - Method = GET - 한 물고기도 여러 번 잡을 수 있으므로 user_fish_id로 구분해서 불러와야, 로그인 필수(헤더에)

      ![image-20201112174130247](REST%20API.assets/image-20201112174130247.png)

      ![image-20201112174208324](REST%20API.assets/image-20201112174208324.png)

    

    - Method = PUT - user_fish_id로 구분,  일단 length만 수정 가능, 로그인 필수

    ![image-20201029133801324](REST%20API.assets/image-20201029133801324.png)

    

    - Method = DELETE - user_fish_id로 구분, 로그인 필수

    ![image-20201029151032985](REST%20API.assets/image-20201029151032985.png)

11. api/users/catches/

    - 성공:  로그인 필요하지 않음 - 잡았던 물고기 정보와 boolean 반환

    ![image-20201105114438978](REST%20API.assets/image-20201105114438978.png)



12. api/fishdiscriminations/

    - 성공: 라벨링 수정할것

    ![image-20201109114417740](REST%20API.assets/image-20201109114417740.png)

​	

 13. rest-auth/password/reset/

     - 해당 이메일로 패스워드 초기화 링크 전송

     ![image-20201111121446229](REST%20API.assets/image-20201111121446229.png)

     - 디자인 수정 필요

     ![image-20201111121623533](REST%20API.assets/image-20201111121623533.png)