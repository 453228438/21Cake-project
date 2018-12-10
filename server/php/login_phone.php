<?php
    header('Access-Control-Allow-Origin:*');
    header("Content-type:text/html;charset=UTF-8");
    $tel = $_GET["phone"];
    $coon = new mysqli('localhost', 'root', '', '21cake', 3306);//连接数据库
    $where = "select * from `user` where tel='$tel'";//查找语句
    $coon -> query("SET NAMES 'utf8'");//字符集
    $do = $coon -> query($where);//执行sql语句
    $result = $do -> fetch_assoc();
    // $row = $do -> fgetc_array();
    // var_dump($row);
    if($result) {
        //  查到数据
        $arr = array("code" => "10000", "data" => "");
    } else {
        // 没有查询到
        $arr = array("code" => "0", "data" => "");
    }
    echo json_encode($arr);
?>