<?php
     header('Access-Control-Allow-Origin:*');
    header("Content-type:text/html;charset=UTF-8");
    // $json = file_get_contents("php://input");
    // $json = json_decode($json);
    // foreach($json as $key => $value){
    //     $tel = $value;
    // }
    $tel = $_GET["phone"];

    $coon = new mysqli('localhost', 'root', '', '21cake', 3306);//连接数据库
    $where = "select * from `user` where tel='$tel'";//查找语句
    $coon -> query("SET NAMES 'utf8'");//字符集
    $do = $coon -> query($where);//执行sql语句
    $result = $do -> fetch_assoc();
    // for($i = 0;$i<count($result);$i++){
    //     if($tel == $result[$i][0]){
    //         var_dump($result[$i][0]);
    //             $arr = array("code" => "10000", "data" => "");
    //              echo json_encode($arr);
    //             break;
    //     }
    //     if(!($tel == $result[$i][0])){
    //          $arr = array("code" => "0", "data" => "");
    //          echo json_encode($arr);
    //     }
    //     // var_dump(json_encode($arr));
       
    // }
    if($result) {
        //  查到数据
        $arr = array("code" => "10000", "data" => "");
    } else {
        // 没有查询到
        $arr = array("code" => "0", "data" => "");
    }
    echo json_encode($arr);
?>