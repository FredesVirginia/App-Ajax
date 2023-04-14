<?php

include('database.php');
$query = 'SELECT * FROM task';
$result = mysqli_query($conection , $query);
    if(!$result){
        die('Consula all list Tas FALLOS');
    }

   
    //aqui vamos a recorrer lo que nos trae la base de datos y lo 
    //convertiermos a json
    $json = array();
    while( $row = mysqli_fetch_array($result)){
        $json [] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id'],
        );
    };

    //luego lo codificamos
    $jsonString = json_encode($json);
    echo $jsonString;
   
?>