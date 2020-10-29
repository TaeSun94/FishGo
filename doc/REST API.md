# REST API

### 1. API 목록

#### 인증 API

| 리소스         | POST                                  | GET  | PUT  | DELETE |
| -------------- | ------------------------------------- | ---- | ---- | ------ |
| auth/signup/   | 회원가입<br />& 이메일 인증           | X    | X    | X      |
| auth/login/    | 로그인<br />반환: 토큰                | X    | X    | X      |
| auth/logout/   | 로그아웃                              | X    | X    | X      |
| auth/check/    | 아이디 중복체크<br />반환: True/False | X    | X    | X      |
| auth/callback/ | 카카오 로그인                         | X    | X    | X      |



#### 물고기 API

| 리소스                | POST                        | GET                                                          | PUT                      | DELETE                   |
| --------------------- | --------------------------- | ------------------------------------------------------------ | ------------------------ | ------------------------ |
| api/fishes/           | 물고기 추가                 | 물고기 전체 목록                                             | X                        | X                        |
| api/fishes?keyword    | X                           | 물고기 이름으로 검색                                         | X                        | X                        |
| api/fishes/1/         | X                           | 1번 물고기 정보<br />& 로그인 한 유저가 1번 물고기 잡은적 있는지 | X                        | X                        |
| api/fishes/1/catches/ | X                           | 로그인 한 유저의 1번 물고기 낚시 목록                        | X                        | X                        |
| api/fishes/1/catch/   | 1번 물고기 낚시 목록에 등록 | 낚시 된 물고기 정보                                          | 낚시 된 물고기 정보 수정 | 낚시 된 물고기 정보 삭제 |
| api/users/            | X                           | 유저 전체 목록                                               | X                        | X                        |
| api/users/1/          | X                           | 1번 유저 정보                                                | X                        | X                        |
| api/users/1/catches/  | X                           | 1번 유저가 낚시한 물고기 전체 목록(물고기 번호만 출력)       | X                        | X                        |



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
   - 프론트 부분과 함께 수정 필요



6. api/fishes/ 

   - Method = GET

   ![image-20201029115054459](REST%20API.assets/image-20201029115054459.png)

   

   - Method = POST

   ![image-20201029115623570](REST%20API.assets/image-20201029115623570.png)



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

    ![image-20201029133203982](REST%20API.assets/image-20201029133203982.png)

    아웃풋

    ![image-20201029133035505](REST%20API.assets/image-20201029133035505.png)

    

    - Method = GET - 한 물고기도 여러 번 잡을 수 있으므로 user_fish_id로 구분해서 불러와야, 로그인 필수

      ![image-20201029121758357](REST%20API.assets/image-20201029121758357.png)

      

    - Method = PUT - user_fish_id로 구분,  일단 length만 수정 가능, 로그인 필수

    ![image-20201029133801324](REST%20API.assets/image-20201029133801324.png)

    

    - Method = DELETE - user_fish_id로 구분, 로그인 필수

    ![image-20201029151032985](REST%20API.assets/image-20201029151032985.png)

11. api/users/1/catches/

    - 성공:  로그인 필요하지 않음 - 잡았던 물고기 id들만 리스트로 출력

    ![image-20201029151658759](REST%20API.assets/image-20201029151658759.png)