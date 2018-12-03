<?php
    header("Content-type:text/html;charset=UTF-8");
    $tel = $_POST['phone'];
    $psw = $_POST['password'];
    $birth = $_POST['birth'];
    $coon = new mysqli('localhost', 'root', '', '21cake', 3306);//连接数据库
    $insert_sql = "INSERT INTO `user` (username,tel,`PASSWORD`,birth) VALUES ('$tel','$tel','$psw','$birth')";
    $coon -> query("SET NAMES 'utf8'");//写库 
	$row = $coon -> query($insert_sql);
	if($row){
		echo "<script>
            alert('注册成功！');
            if(alert){
                window.location ='../app/login.html';
            }
		</script>";
	}else {
		"<script>
			alert('注册失败！');
		</script>";
	}
?>