## Express - CRUD



| Medhod | Path             | GET Parameter | POST Parameter          | Comment      |
| ------ | ---------------- | ------------- | ----------------------- | ------------ |
| GET    | /students        |               |                         | 首頁         |
| GET    | /students/delete | id            |                         | 刪除頁面     |
| GET    | /students/edit   | id            |                         | 修改頁面     |
| GET    | /students/new    |               |                         | 新增頁面     |
| POST   | /students        |               | name,age,gender,hobbies | 送出新增資料 |
| POST   | /students/edit   |               | name,age,gender,hobbies | 送出修改資料 |
