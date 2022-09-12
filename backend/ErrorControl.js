// 코드 목적 : Main Server 에서 발생할 가능성이 있는 오류를 케이스화 한다.

const errorTable = {
    1 : "user_id 입력 오류",
    2 : "tattooist_id 입력 오류",
    3 : "draft_id 입력 오류",
    4 : "reservation id 입력 오류",
    5 : "tattoo_id 입력 오류",
    6 : "filter 입력 오류",
    10 : "탐색 결과 없음",
    11 : "검색 결과 없음",
    20 : "email 중복",
    21 : "email 불일치",
    22 : "password 불일치",
    23 : "데이터 수정 실패",
    30 : "블록체인 정보 없음",
    31 : "채팅 서버 연결 실패"
}

module.exports = errorTable