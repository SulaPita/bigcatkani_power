$(function () {
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({  // 選擇 #contactForm 的 input 和 textarea，並為其啟用 jqBootstrapValidation 插件
        preventSubmit: true,
        submitSuccess: function ($form, event) {
            event.preventDefault(); // 阻止默認提交行為 改用自定義的行為

            // 構造 FormData 物件
            var formData = new FormData();
            formData.append("name", $("input#name").val());
            formData.append("email", $("input#email").val());
            formData.append("message", $("textarea#message").val());
            var fileInput = document.getElementById("myFile1"); // 獲取文件輸入框的 DOM 元素
            if (fileInput.files.length > 0) { // 檢查是否有文件被選中
                formData.append("myFile1", fileInput.files[0]); // 添加文件到 FormData
            }

            // 發送 AJAX 請求到伺服器端的 /contact_me 路徑
            $.ajax({
                url: "/contact_me", // 設定請求的目標 URL
                type: "POST", // 使用 POST 方法提交數據
                data: formData, // 將 FormData 對象作為請求的數據
                contentType: false, // 確保發送的是 multipart/form-data
                processData: false, // 禁止 jQuery 處理數據
                success: function () { // 如果請求成功，顯示成功消息
                    $('#success').html("<div class='alert alert-success'>") // 在 #success 元素中插入一個成功的提示框
                        .append("<strong>Your message has been sent!</strong>") // 添加提示文字
                        .append("</div>");
                    $('#contactForm').trigger("reset"); // 清空表單
                },
                error: function () { // 如果請求失敗，顯示錯誤消息
                    $('#success').html("<div class='alert alert-danger'>")
                        .append("<strong>Failed to send your message. Please try again later.</strong>")
                        .append("</div>");
                },
            });
        },
    });
});