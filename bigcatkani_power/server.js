// 載入必要的模組
const express = require("express"); //Express 是用於建立伺服器的 Node.js 框架
const bodyParser = require("body-parser"); // 處理請求中的 JSON 和 URL 編碼數據
const fileUpload = require("express-fileupload"); // 處理文件上傳的模組
const DB = require("nedb-promises"); // NeDB 是輕量級資料庫，用於儲存數據，並提供 Promise API

// 初始化 Express 應用
const server = express(); // 建立一個 Express

// 1. 配置靜態文件目錄
server.use(express.static(__dirname+"/kani")); // 靜態文件夾名稱可以改成你的前端文件夾名稱 用戶可以直接通過 HTTP 訪問該文件夾內的文件

// 2. 使用 body-parser 處理請求數據
server.use(bodyParser.json()); // 將請求體中的 JSON 數據解析為 JavaScript 對象
server.use(bodyParser.urlencoded({ extended: true })); // 處理 URL 編碼數據，支持嵌套對象
server.use(fileUpload()); // 啟用文件上傳功能，解析 multipart/form-data 請求

// 3. 初始化資料庫
const ContactDB = DB.create({
    filename: __dirname + "/contact.db", // 資料庫文件的路徑
    autoload: true,  // 啟用自動創建和加載資料庫功能，如果文件不存在會自動創建
});

// 定義 /contact_me 路由
server.post("/contact_me", async (req, res) => {
    try {
        // 從表單中提取字段
        const { name, email, phone, message } = req.body;

        // 處理文件上傳
        let uploadedFileName = null; // 初始化上傳文件名稱為空
        if (req.files && req.files.myFile1) { // 檢查是否有文件上傳
            const file = req.files.myFile1; // 獲取上傳的文件
            uploadedFileName = `uploads/${Date.now()}_${file.name}`; // 確保文件名唯一
            const uploadPath = __dirname + "/" + uploadedFileName; //當文件的所在路徑

            // 保存文件到伺服器指定地方
            await file.mv(uploadPath);
        }

        // 保存數據到資料庫的東東
        const newEntry = {
            name,
            email,
            message,
            timestamp: new Date(), // 當前時間戳，用於記錄提交時間
        };

        await ContactDB.insert(newEntry);

        // 返回成功回應
        res.status(200).send("Message and file uploaded successfully");
    } catch (err) {
        console.error("Error processing contact form:", err);
        res.status(500).send("Failed to process contact form");
    }
});

// 啟動伺服器
const PORT = 3000; // 設定伺服器監聽的端口號
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // 提示伺服器已啟動並顯示本地訪問網址
});