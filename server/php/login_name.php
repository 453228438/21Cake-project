<?php
    header("Content-type:text/html;charset=UTF-8");
    $username = $_GET["username"];
    $coon = new mysqli('localhost', 'root', '', '21cake', 3306);//连接数据库
    $where = "select * from `user` where username='$username'";//查找语句
    $coon -> query("SET NAMES 'utf8'");//字符集
    $do = $coon -> query($where);//执行sql语句
    $result=mysqli_query($coon,$where);
    $result2 = $do -> fetch_assoc();
    $row=mysqli_fetch_assoc($result);
    //printf ("%s",$row["password"]);
    $psw = $row["password"];
    // var_dump($row);
    if($result2) {
        //  查到数据
        $arr = array("code" => "10000", "data" => "$psw");
    } else {
        // 没有查询到  
        $arr = array("code" => "0", "data" => "");
    }
    echo json_encode($arr);
?>