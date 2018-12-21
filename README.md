# Node.js
* Node.js 介紹
    * Node.js 不是一門語言
    * Node.js 不是庫、不是框架
    * Node.js 是一個JavaScript的運行時環境
    * 簡單點來講就是Node.js可以解析和運行JavaScript代碼
    * 也就是說現在JavaScript可以脫離瀏覽器來運行，一切歸功於Node.js
    
* 瀏覽器中的 JavaScript
    * EcmaScript
        * 基本語法
        * if
        * var
        * function
        * Object
        * Array
    * BOM
    * DOM 
    
* Node.js 的 JavaScript
    * **沒有BOM、DOM**
    * EcmaScript
    * 在 Node 這個 Javascript執行環境中為JS提供了一些服務器級別的操作API
        * 文件讀寫
        * 網路服務建構
        * 穩路通信
        * Http 服務器
        
* 建構在 Chrome 的 V8引擎支上
    * 代碼只是具有特定格式的字串
    * 引擎可以認識它，引擎可以幫你去解析和執行
    * Google Chrome 的 V8 引擎可以幫你去解析和執行
    * Node.js 的作者把 Google Chrome 的 V8 引擎移植出來，開發了一個獨立的JavaScript 運行環境
    
* Node.js 的 特性
    * 事件驅動
    * 非阻塞IO模型(異步)
    * 輕量和高效

* Node.js 的 
    * npm 世界最大開源生態系統
    * 絕大部分的Jacascript相關的套件都存放在 npm 上，方便開發人員使用下載
    * ``` npm install jquery  ```

## 1. File-Stream
- fs 是 file-system的簡寫，就是文件系統的意思
- 在 Node 中如果想要進行文件操作，就必須引入fs這個核心模塊
- 所使用的文件操作的 API 都是異步 
- readFile 的第二個參數是可選的，傳入utf8 就是告訴她把讀取到的文件直接轉成utf8編碼
``` javascript=
    fs.readFile('./db.json','utf8',(err,data)=>{
    })
```

## 2. HTTP 服務
2.1. 加載 http 核心模塊
``` javascript=
var http = require('http') 
```
2.2. 使用 http.createServer() 創建一個Web服務器
``` javascript=
var server = http.createServer() 
```
2.3. 服務器要做啥?
    * 提供服務 (數據的服務)
    * 發請求
    * 接收請求
    * 處理請求
    * 反饋( 發送響應 )
    * 註冊 Request 請求事件
    * 當客戶端發送請求過來時，會自動觸發服務器的 Request 請求事件，然後執行第二個參數，回調處理 


* request 請求事件處理函數，需接收兩個參數
    * Request 請求對象
        > 請求對象可以用來會取客戶端的一些請求訊息，例如路徑
    * Response 響應對象
        > 可以用來給客戶端發送響應訊息
         
        > Response write 可以使用很多次，但最後一定要使用 **end** 來結束響應，否則客戶端會一直等待
        
        > (F12)NetWork下會自動生成 **favicon.ico**  這支是瀏覽器自動生成給分頁tag圖案用
        
        > 響應內容只能是二進位或字串
        
        > * Content-Type
        >   1.不同資源對應的Content-Type 是不一樣的
        >   2.圖片不需要指定編碼
        >   3.一般只有字符數據才需要指定編碼
``` javascript=
server.on('request', function (request,response) {
    console.log('收到客戶端!請求路徑 :'+ request.url);

    response.write('hello');
    response.write('Node JS');
    response.setHeader('Content-Type','text/plain; charset=utf-8')
    response.end();
    //response.end('apple');
})
```
2.4. 綁定端口號，啟動服務器 (監聽Port)  
    * Ctrl+c = 關閉服務器
    
``` javascript=
server.listen(3000, function () {
    console.log('服務器啟動成功，可以通過 127.0.0.1:3000 來進行訪問');
});
```


![](https://i.imgur.com/2bGxB3w.png)

## 3. 核心模塊
* Node 為Javascript 提供服務器級別的API，這些AP絕大多數被包裝到一個具名的模塊中，例如文件操作的``` fs```核心模塊，http服務建構的```http```模塊等等...

``` Javascript=
var fs = require('fs');
var http = require('http')
```

* Require 是一個方法
    * 它的作用就是用來加仔模塊的，在 Node 中，模塊有三種
        1. 具名的核心模塊 Ex: fs,http
        2. 用戶自己編寫的文件模塊
            * 相對路徑須加上 ./  (不可省略 區分核心模塊)
            * 可以省略後綴名

        3. Node 中，沒有全局作用域，只有模塊作用域
            * 外部訪問不到內部
            * 內部也訪問不到外部
    * Require 方法有兩個作用
        1. 加仔文件模塊並執行裡面的代碼
        2. 拿到被加載文件模塊導出的街口對象
            > * 在每個文件模塊中提供了一個對象: export s
            > * exports默認是一個空對象


## 4. 服務端渲染
- 服務端渲染介紹
    + 說白了就是在服務端使用模板引擎
    + 模板引擎最早誕生於服務端，後來才發展到了前端

- 服務端渲染和客戶端渲染的區別
    + 客戶端渲染不利於 SEO 搜索引擎優化
    +  服務端渲染是可以被爬蟲抓取到的，客戶端異步渲染是很難被爬蟲抓取到的
    +  所以你會發現真正的網站既不是純異步也不是純服務端渲染出來的，而是兩者結合來做的
    + 例如京東的商品列表就採用的是服務端渲染，目的了為了 SEO 搜索引擎優化
    + 而它的商品評論列表為了用戶體驗，而且也不需要 SEO 優化，所以採用是客戶端渲染

- 瀏覽器收到 HTML 響應內容之後，就要開 始從上到下依次解析，
    當在解析的過程中，如果發現：
      link
      script
      img
      iframe
      video
      audio
      等帶有 src 或者 href（link） 屬性標籤（具有外鏈的資源）的時候，**瀏覽器會自動對這些資源發起新的請求**。
      

## 5. Node 中的模塊系統
使用 Node 編寫應用程式主要就是在使用
- EcmaScript 語言
    + 和瀏覽器不一樣，在 Node 中沒有BOM、DOM
- 核心模塊
    + 文件操作的 fs
    + http 服務的 http
    + url 路徑操作模塊
    + path 路徑處理模塊
    + os 操作系統訊息
- 第三方模塊
    +  art-template
    +  必須通過 npm 來下載才可以使用
- 自製模塊  
    + 自己創建的文件

### 5.1. 什麼是模塊化
- 文件作用域
- 通信規則
    + 加載 require 
    + 導出 
### 5.2. CommonJS模塊規範
在 Node 中的Javascript還有一個很重要的概念，模塊系統
- 模塊作用域
- 使用 require 方法用來加載模塊
- 使用 exports 街口對像來導出模塊中的成員
#### 5.2.1 加載 `require`
語法
``` javascript=
var 變量名稱 = require('模塊')
```
作用
- 執行倍加載模塊中的代碼
- 得到倍加載模塊中的export導出街口對象
#### 5.2.2 導出 `exports`
- Node 中視模塊作用域，默認文件中所有的程有只有在當前文件模塊有效
- 對於希望可以被其他模塊訪問的成員，須將公開的成員都掛載到 `exports`皆可對像中就可以了
    + 導出多個成員 (必須在對象中)
    ``` javascript=
        exports.a = 123;
        exports.b = 'hello'
        exports.c = function(){
        console.log('asd')
        }
    ```    
    + 導出單個成員 
    ``` javascript=
        module.exports = 'hello'

        module.exports = function (x, y) {
          return x + y
        }
        
        module.exports = {
          add: function () {
            return x + y
          },
          str: 'hello'
        }
    ```
    
##### 5.2.2.1 Exports原理
- 在 Node 中，每個模塊內部都有一個自己的 module 對象
- 該 module 對像中，有一個成員叫：exports 也是一個對象
- 就是說如果你需要對外導出成員，只需要把導出的成員掛載到 module.exports 中
    ``` javascript=
    var module = {
      exports: {
        foo: 'bar',
        add: function..
      }
    }

    // 也就是說在模塊中還有這麼一句代碼
    var exports = module.exports
    ```

### 5.3 模塊標識
- 非路徑形式的模塊標識
- 路徑形式的模塊
    + ./ 當前目錄，不可省略
    + ../ 上一級目錄，不可省略
    + 首位的 / 在這裡表示的是當前文件模塊所屬磁盤根路徑
    + .js 後綴名可以省略
- 核心模塊
    +  核心模塊文件已經被編譯到了二進製文件中了，我們只需要按照名字來加載就可以了
    ``` javascript=
     require('fs')
     require('http')
    ```
- 第三方模塊
    + 凡是第三方模塊都必須通過 npm 來下載
    + 使用的時候就可以通過 require('包名') 的方式來進行加載才可以使用
    + 不可能有任何一個第三方包和核心模塊的名字是一樣的，既不是核心模塊、也不是路徑形式的模塊
    + 先找到當前文件所處目錄中的 node_modules 目錄
    + node_modules/art-template
    + node_modules/art-template/package.json 文件
    + node_modules/art-template/package.json 文件中的 main 屬性
    + main 屬性中就記錄了 art-template 的入口模塊
    + 然後加載使用這個第三方包，實際上最終加載的還是文件
    + 如果 package.json 文件不存在或者 main 指定的入口模塊是也沒有，則 node 會自動找該目錄下的 index.js，也就是說 **index.js 會作為一個默認備選項**
    + 如果以上所有任何一個條件都不成立，則會進入上一級目錄中的 node_modules 目錄查找，如果上一級還沒有，則繼續往上上一級查找
    + 意：我們一個項目有且只有一個 node_modules，放在項目根目錄中，這樣的話項目中所有的子目錄中的代碼都可以加載到第三方包不會出現有多個 node_modules


### 5.4 npm
> node package manager
#### 5.4.1 npm 網站
>https://www.npmjs.com/
#### 5.4.2 npm 命令工具
- npm 有版本這個概念
    ``` cmd=
    npm --version
    //升級npm
    npm install --global npm
    ```
 - 常用命令
     + `npm init`
         + npm init -y 可以跳過導向，快速升成
     + `npm install`
         + 一次性把dependencies選項中的依賴項全部安裝
         + npm i
     + `npm install 包名`
         + 只下載
         + npm i 包名
     + `npm install --save包名`
         + 下載並且包存依賴項(package.json文件中的dependencies選項)
         + npm i -s 包名
     + `npm uninstall 包名`
         + 只刪除，如果有依賴項會依然保存
     + `npm uninstall --save 包名`
         + 刪除同時會把依賴順系順便也去除
         + npm un -s 包名
     + `npm help`
         + 查看使用幫助
     + `npm 命令 -help`
         + 查看指定命令的使用幫助     


### 5.5 package.json
- 建議每一個專案都需要一個`package.json`文件 (包描述文件，就像產品的說明書一樣)
- 文件可以透過 `npm init` 的方式自動初始化出來
- 檔案內的`dependencies`選項，可以用來幫助我們保存且一目了然第三方包的依賴訊息
- 使用 npm install 前後加上`--save`可以將第三方包寫入 `dependencies` 裡面
    ``` javascript
    npm i art-template --save
    mpm i --save art-template
    ```
- 如果`node_modules`刪除了也不用擔心，我們只需要`npm install`就會自動把`package.json`中的`dependencies`中所有的依賴項都載回來
- **package.json 和 package- .json差異**
    + npm5 以前是不會有 `package-lock.json` 這個文件
    + npm5 以後才加入這個文件，當你安裝包的時候，npm會生成或更新`package-lock.json`
    + `package-lock.json`這個文件會保存`node_modules`中所有包的訊息
        + 重新`npm install`的時候速度就可以提升
    + `package-lock.json`這個文件的另外一個公用就是用來鎖定版本號，防止自動升級版本

## 6. 文件操作路徑和模塊路徑
- 文件操作的相對路徑
    + **./data/a.txt** 相對於當前目錄
    + **data/a.txt** 相對於當前目錄
    + **/data/a.txt** 絕對路徑，當前文件模塊所處磁碟機的根目錄
    + **c:/xx/xx/** 絕對路徑    
     ``` javascript=
    fs.readFile('./data/a.txt',function(err,data){
    })
    ```
- 模塊操作路徑
    + 模塊加載的路徑中相對路徑不能省略
     ``` javascript=
        //如果這裡省略了，則也是磁碟根目錄
        require('data/foo.js')
        //相對路徑
        require('./data/foo.js')
    ```

## 7. 修改完帶碼自動重啟
- 這裡可以使用一個第三方命名行工具 `nodemon` 來解決頻繁修改代碼重啟服務器的問題
- `nodemon`是一個基於Node.js開發的一個第三方命令行工具，我們使用的時候需要獨立安裝
``` cmd=
npm install --global nodemon
```
安裝完畢之後，使用
``` cmd=
node app.js

# 使用 nodemon
nodemon app.js
```
## 8. path 路徑操作模塊
> [參考文檔](https://nodejs.org/dist/latest-v10.x/docs/api/path.html)
- path.basename
    + 獲取一個路徑的文件名(默認不包含副檔名)
- path.dirname
    + 獲取一個路徑中的目錄部分
- path.extname
    + 獲取一個路徑中的副檔名
- path.parse
    + 把一個路徑轉為對象
        + root 根目錄
        + dir 目錄
        + base 包含副檔名的文件名
        + ext 後綴名
        + name 不包含副檔名的文件名
- path.join
    + 需要進行路徑合併時，推薦使用
- path.IsAbsolute
    + 判斷一個路徑是否為絕對路徑  


## 9. Node 中的其他成員

在每個模塊中，除了`require`、`exports`等模塊相關API之外，還有兩個特殊的成員
-  `__dirname`: **動態獲取**可以用來獲取當前文件模塊所屬目錄的絕對路徑
-  `__filename`: **動態獲取**可以用來獲取當前文件的絕對路徑
-  `__dirname`和`__filename`是不受執行node命令所屬路徑影響

**文件相對路徑中，相對路徑設計的就是相對於執行 node 命令所處的路徑**

在文件操作中，使用相對路徑是不可靠的，因為在Node中文件操作的路徑是被設計為相對於執行 node 命令所處的路徑
所以為了解決這個問題，須將相對路徑統一改成絕對路徑。
我們可以使用`__dirname`和`__filename`來幫我們解決這個問題。
> 補充: 模塊中的路徑和這裡的路徑沒關係，並不受node 命令所處的路徑影響

## 10. Express

### 10.1. 基本
#### 10.1.1 安裝
`npm install --save express`
#### 10.1.2 Hello World
``` javascript=
const express = require('express');
const app = express();

app.get('/',(req,res) => res.send('Hello World!'));

app.listen(3000,()=>console.log('Service runnong!'));
```
#### 10.1.3 基本路由
- 路由器
    + 請求方法
    + 請求路徑
    + 請求處理函數
- **GET**
``` javascript=
app.get('/',function(req,res){
    res.send('Hello World!');
})
```
- **POST**
``` javascript=
app.post('/',function(req,res){
    res.send('Hello World!');
})
```
#### 10.1.4 靜態服務
- 公開指定目錄
    + 只要這樣做了，就可以直接通過/public/xx的方式訪問 public 目錄中的所有資源
``` javascript=
app.use('自訂Url目錄',express.static('實際目錄'))

// public 資源
app.use(express.static('public'))

// static資源
app.use(express.static('files'))

// public/xxx
app.use('/pulic',express.static('public'))

// static/xxx
app.use('/static',express.static('static'))
```

### 10.2 Express 中配置使用`art-template`模板引擎
#### 10.2.1 安裝
``` cmd=
npm install --save art-template
npm install --save express-art-tepmplate
```
#### 10.2.2 配置
- 第一個參數表示，渲染以 .html 結尾文件的時候
``` javascript=
app.engin('html',require('express-art-template'))
```
#### 10.2.3 使用
- Express 為 Response 相應對象提供了一個方法: render
- render 方法默認是不可以使用，但是如果配置了模板引擎就可以使用了
- **res.render('html模板名',{模板數據})**
``` javascript=
app.get('/',function(res,rsp){
//express 默認會去抓項目中的 views目錄找 idnex.html
    res.render('index.html',{
        title:''
    })
})
```
- 第一個參數不能寫路徑，默認會去項目中的`views`目錄查該模板文件
- 如果試圖修改默認的`views`渲染儲存目錄
``` javascript
//更改路徑
app.set('views','public')
```
### 10.3 Express 中獲取表單GET請求參數
- Express 內置了一個API,可以直接通過`req.query`來獲取
``` javascript=
req.query
```
### 10.4 Express 中獲取表單POST請求參數
- Express 內置了一個API,這裡使用第三方套件`body-parser`
#### 10.4.1 安裝
``` cmd=
npm install --save body-parser
```
#### 10.4.2 配置
``` javascript=
var express = require('express')
var bodyparser = require('body-parser')
var app =exporess()

//配置 body-parser 中間件（插件　專門用來解紛表單 POST 請求體)
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
```
#### 10.4.3 使用
``` javascript=
app.use(function (req,res){
    res.send(cres.body)
})
```

## 11. MongoDB
- 官網: https://mongoosejs.com/
- 官方指南: https://mongoosejs.com/docs/guide.html
- 官方API文檔: https://mongoosejs.com/docs/api.html

###  11.1. 啟動和關閉數據庫
- 啟動

    ``` cmd= 
    ## mongodb 默認使用執行 mongod 命令所處的磁碟根目錄下的 /data/db 作為自己數據存儲的目錄
    ## 第一次執行該命令時請先自己手動新建一個 /data/db
    mongod
    ```
    - 如果想要修改默認的存儲目錄

    ``` cmd=
    mongod --db
    -數據儲存目錄路徑
    ```
- 關閉
    ``` cmd=
    ## 在開啟服務的控制台，直接 Ctrl+C 即可停止，或是直接關閉開啟服務的控制台也可
    ```
- 連接

    ``` cmd= 
    ## 該命令默認連接畚箕的 MongoDB 服務
    mongo
    ```
- 退出
    ``` cmd= 
    ## 該連接狀態輸入 exit 退出連接
    exit
    ```
### 11.2. MongoDB 資料庫的基本概念
- 數據庫 - 可以有多個數據庫
    > ex: google,yahoo
- 集合 - 一個數據庫中可以有多個集合
    > ex: users,product
- 文檔 - 一個集合中可以有多個文檔
    > ex: {name:'Hugo',age: 18}.... 
    ``` javascript= 
    {
        google:{
            users: [
                {name:'Hugo',age: 18},
                {name:'Bem',age: 18},
                {name:'Kevin',age: 18},
                {name:'Howard',age: 18},
                {name:'Jimmy',age: 18},
                {name:'SPY',age: 18},
                ....
            ],
            products:[
            ]
        },
        yahoo:{
        }
    ]
    ```
- 基本命令    
    - `show dbs`
        > 查看顯示所有數據庫
    - `db`
        > 查看當前操作的數據庫
    - `use 數據庫名稱`
        > 切換到指定的數據(如果沒有則新建)
    - `show collections`
        > 查看顯示所有集合
    - `db.集合名稱.find()`
        > 顯示該集合所有資料    
- Hello world
``` javascript=
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'test'});
kitty.save((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('meow')
    }
})
```

- **新增**
``` javascript=
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//連接數據庫
mongoose.connect('mongodb://localhost/itcast');

//設計集合結構
var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});
// mongoose.model 方法就是用來將一個架構發佈為 model
// 第一個參數: 傳入一個大寫的名稱字串用來表示數據庫名稱
//            mongoose 會自動將大寫名詞的字串生成 **小寫複數** 的集合名稱
//            例如: User -> users 的集合名稱
// 第二個參數: 架構 Sechemac
var User = mongoose.model('User', userSchema);
var admin = new User({
    username: 'Hugo',
    password: '123',
    email: 'hugo@gmail.com'
})

admin.save((err,ret)=>{
    if(err){
        console.log('保存失敗')
    }else{
        console.log('保存成功')
        console.log(ret);
    }
})

```

- **查詢**
``` javascript=
// 查詢所有資料
User.find((err, ret) => {
    if (err) {
        console.log('查詢失敗')
    } else {
        console.log(ret)
    }
})

//依照條件查詢資料
User.find(
    { username: 'Ben' }
    , (err, ret) => {
        if (err) {
            console.log('查詢失敗')
        } else {
            console.log(ret)
        }
    })
    
//依照條件查詢單個資料
User.findOne(
    { username: 'Ben' }
    , (err, ret) => {
        if (err) {
            console.log('查詢失敗')
        } else {
            console.log(ret)
        }
    })    
```

- **刪除**
    + 根據條件刪除一個
    ``` javascript=
    Model.findOneAndRemove(conditions,[options],[callback])
    ```
    + 根據ID刪除個
    ``` javascript=
    Model.findByIdAndRemove(id,[options],[callback])
    ```
    + Example
    ``` javascript=
    // 刪除所有資料
    User.remove((err, ret) => {
        if (err) {
            console.log('刪除失敗')
        } else {
            console.log(ret)
        }
    })

    //依照條件刪除資料
    User.remove(
        { username: 'Ben' }
        , (err, ret) => {
            if (err) {
                console.log('刪除失敗')
            } else {
                console.log(ret)
            }
        })

    ```
- **更新**
    + 根據條件更新所有
    ``` javascript=
    Model.update(conditions,[options],[callback])
    ```
    + 根據指定條件更新一個
    ``` javascript=
    Model.findOneAndUpdate([conditions],[update],[options],[callback])
    ```
    + 根據ID更新一個
    ``` javascript=
    // 刪除所有資料
    User.findByIdAndUpdate(
        '5c137fac9dcb744c1ccf134a'
        ,{username:'Hugo'}
        ,(err,ret) =>{
            if(err){
                console.log('更新失敗')
            }else{
                console.log('更新成功')
                console.log(ret)
            }

        }
    )
    ```    
### 3. 基本命令
- `show dbs`
    > 查看顯示所有數據庫
- `db`
    > 查看當前操作的數據庫
- `use 數據庫名稱`
    > 切換到指定的數據(如果沒有則新建)
- `show collections`
    > 查看顯示所有集合
- `db.集合名稱.find()`
    > 顯示該集合所有資料
## 12. 在Express配置使用`express-session`套件
> [參考文檔](https://github.com/expressjs/session)
- 安裝
``` javascript=
$ npm install express-session
```
- 配置
``` javascript=
app.use(session({
    // 配置加密字串，在原有的字串上加上這個字串拼起來去加密
    // 目的是為了增加安全性，防止客戶端惡意使用
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true     //無論是否有使用，默認給予一把鑰匙
  }))
  
```
- 使用
``` javascript=
//添加 Session
req.session.foo = 'bar' 
//獲取 Session
req.session.foo
```
- 提是 默認Session是內存存儲的，服務器一但重啟就會丟失，真正的生產環境會把Session進行持久化存儲。
## 13. 中間件
- 當請求進來，會從第一個中間件開始進行匹配，如果匹配，則進來，如果請求進入中間件之後，沒有調用 next 則代碼會停在當前中間件
- 中間件本身是一個方法，該方法接收三個參數：
    + Request 請求對象
    + Response 響應對象
    + next 下一個中間件
- 統一處理error message
    >  當調用 next 的時候，如果傳遞了參數，則直接往後找到帶有 四個參數的應用程序級別中間件
    + **return next(err)**; 
``` javascript=
//router.js
router.post('/login', (req, res,next) => {
    var body = req.body;
    body.password = md5(body.password);
    console.log(body.password)
    User.findOne({
        email: body.email,
        password: body.password
    }, (err, data) => {
        if (err) {
            return next(err);
        }
    })
})
//app.js
app.use((err,req,res,next)=>{
    res.status(500).json({
        err_code:500,
        message:err.message
    })
})
```


- 統一處理404頁面
    > 放在中間件的最後面，如果都沒有呼叫就會呼叫這個404處理頁面
``` javascript=
app.use((req,res)=>{
    res.render('404.html');
})
```
## 14. Promise
- 回調地獄

    > 為了確保非同步方法的執行順序，所以會將方法塞進方法內，這種方式簡稱**回調地獄**
    ``` javascript=
    var fs = require('fs');

    fs.readFile('./a.txt', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data);
        fs.readFile('./b.txt', 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            console.log(data);
            fs.readFile('./c.txt', 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                console.log(data);
            })
        })
    })

    ```

- Promise 用法

    ``` javascript=
    var fs = require('fs')

    var p1 = new Promise(function (resolve, reject) {
        fs.readFile('./a.txt', 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

    var p2 = new Promise(function (resolve, reject) {
        fs.readFile('./b.txt', 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

    var p3 = new Promise(function (resolve, reject) {
        fs.readFile('./data/c.txt', 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

    p1
        .then(function (data) {
            console.log(data)
            return p2
        }, function (err) {
            console.log('读取文件失败了', err)
        })
        .then(function (data) {
            console.log(data)
            return p3
        })
        .then(function (data) {
            console.log(data)
            console.log('end'), (err) => {
                console.log(err)
            }
        })

    ```
    ![](https://i.imgur.com/qygF7Pm.png)

    ![](https://i.imgur.com/GrD2RK2.png)

 - 封裝 Promise版本
 ``` javascript=
 var fs = require('fs')

function pReadFile(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

pReadFile('./a.txt')
    .then((data) => {
        console.log(data);
        return pReadFile('./b.txt')
    })
    .then((data) => {
        console.log(data);
        return pReadFile('./c.txt')
    })
    .then((data) => {
        console.log(data);
    })


 ```
## 實作
- 通過服務器讓客戶端重新導向
    + 狀態碼設置為 302 臨時重定向
        ` statusCode `
    + 在響應頭中通過 Location 告訴客戶端在哪重新定向
        `setHeader`
    + Example
        ``` javascript=
        res.statusCode =302;
        res.setHeader('Location','/')
        ```
- 如何設定Express 404頁面
    ``` javascript=
    //所有未處理的請求路徑都會跑到這裡
    app.use((req,res)=>{
        res.send('404444444444444444444');
    })
    ```