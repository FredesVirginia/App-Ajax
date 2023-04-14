<?php

  include('database.php');
  $id = $_POST['id'];
  $query = "DELETE FROM task WHERE id = $id";
  $result = mysqli_query($conection , $query);
   if(!$result){
    die( "ERRO DELETE");
   }
   echo " SE BORRO PERFETOOOOOOOOOOOOOO";
?>