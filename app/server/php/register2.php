<?php
   header('Access-Control-Allow-Origin:*');
    header("Content-type:text/html;charset=UTF-8");
    $json = file_get_contents("php://input");
		//echo $json;
 		 $json = json_decode($json); 
    //var_dump($json);
    $tel = $json->tel;
    $psw = $json->psw;
    $birth = $json->birth;
    // var_dump($tel);
    $coon = new mysqli('localhost', 'root', '', '21cake', 3306);//连接数据库
    $insert_sql = "INSERT INTO `user` (username,tel,`PASSWORD`,birth) VALUES ('$tel','$tel','$psw','$birth')";
    $coon -> query("SET NAMES 'utf8'");//写库 
	$row = $coon -> query($insert_sql);
	if($row){
		// echo "<script>
        //     alert('注册成功！');
        //     if(alert){
        //         window.location ='http://localhost:3333/21Cake-project/app/login.html';
        //     }
        // </script>";
         $arr = array("code" => "10000", "data" => "");
	}else {
		// echo "<script>
        //     alert('注册失败！');
        //     if(alert){
        //         window.location ='http://localhost:3333/21Cake-project/app/register.html';
        //     }
        // </script>";
        $arr = array("code" => "0", "data" => "");
    }
    echo json_encode($arr);
?>