<?php
    include ('database.php');
     $search = $_POST['search'];
     if(!empty($search)){
        // con el porcentaje , estamos diciendo que
        //nos pase todos los elementos que el pareascan
        $query = "SELECT * FROM task WHERE name LIKE '$search%'";
        //la variable $conetion, viene del archuvo que incluimos arriba,
       $result= mysqli_query($conection , $query);
       if(!$result){
        die("Error de consulta");
       }

       //si todo salio bien, aqui vamos a procesar el resultado de $result cmo un json
       // para eso, lo convertimos aun array, con mysql_fetch_array, 
       //mientras lo recorremos lo guardamos en l array que se llama $json
       $json = array();
       while( $row = mysqli_fetch_array($result)){
            $json[] = array(
                'name' => $row['name'],
                'description' => $row['description'],
                'id' => $row['id'],
            );
       }

       //aqui, el json, los pasamos a un string
       $jsonString = json_encode($json);
       echo $jsonString;
     }

?>