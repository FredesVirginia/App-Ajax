console.log("Hola qui el script");
$(document).ready(function(){
    console.log("jquery andando");
    let edit= false;
    obtenerTask();
    //aqui en principio lo que nos ahojar el search, va aser oculto, y se mostrara solo cuando se haga 
    //el search
     $('#task-result').hide();
    //aqui estamos diciendo, de capturar el elemento con el id search
    //y keyup, es cuando el usuario hizo click en una funcion
    //val, para obtener su valor
    $('#search').keyup(function (){
        //aqui verificamos si existe el id, search
        if($('#search').val()){
            let search= $('#search').val();
            console.log("EL search es " , search);
            $.ajax({
             //aqui vamos a ser una peticion a mi servidor
              url : 'task-search.php',
              //la peticion sera de tipo post
              type : 'POST',
              //para enviar datos al servidor .. en este caso le estamos enviado el search, 
              //que obtubimos arriba
              data: {search},
              //suceess es una funcion predeterminada
              success : function(response){
                 console.log("la respuesta success" , response);
                let task = JSON.parse(response);
               
                 console.log(task);
                 //aqui cremoaermos una platilla, para llenarlo con los elemntoes del forEach
                 let template = "";
                 //aqui recorremos la taks, el objeto json, asi los obtenemos uno por uno
                 task.forEach(task =>{ 
                     template +=`<li>
                      ${task.name}
                       </li>`
                 });
                 
                 //seleccionamos el elementos container, y lo llenamos con el template
                 $('#container').html(template);
                 $('#task-result').show();
              }
            })
        }
    
    
    
    })

    //aquie estamos selecionando el id task-form, y camputamos su evento submit.
   
    
    $("#task-form").click(function(e) {
        e.preventDefault();
       console.log("Enviado");
       const postData = {
        name : $('#name').val(),
        description : $('#description').val(),
        id : $('#taskId').val()
       }
       console.log("El form post es " , postData);
       //aqui estamos verificando, si queremos edita, le enviaremos a un ruta, 
       // sino queremos edita, se le enviaremos a otra
       let url = edit === false ? 'task.add.php' : 'task-edit.php';
       
       //este es un metodo de jquery, para enviar datos al servidor
       //le enviamos e, y que hacer cuando reciba una respueta, con el parametro
       //function
       $.post(url, postData , function(response){
         console.log("Recibido" , response);
         //con esto volvemos.. todos los datos del form en blanco
         obtenerTask();
         $('#form').trigger('reset');
       });

      });
      
  
    function obtenerTask(){
        $.ajax({
            url : 'task-list.php',
            type : 'GET',
            success : function(response){
              let tareas = JSON.parse(response);
               
                let template = "";
               
                tareas.forEach(task =>{ 
                    template +=`<tr  taskId= "${task.id}">
                    <td> ${task.id} </td>
                    <td>
                     <a href="#" class="task-item">  ${task.name}  </a>
                    </td>
                    <td> ${task.description} </td>
                    <td> 
                        <button class=" task-delete btn">
                           🗑
                        </button>
                    </td>
                    <td> 
                        
                </td>

                      </tr>`
                });
                
               
                $('#tasks').html(template);
             }
         })
    }
    //aqui vamos a escuhar el boton que se preciono, de borrar una tarea
    $(document).on('click' , '.task-delete ', function(){
       //$(this) obtenemos el boton que se clicleo
       // let element = $(this);
       //aqui seleccionamos el boton en cuestion, y escalamos en su arbol, hasta llegar
       // al padre, para obtener el id
        // aqui, esplicacion, el boton tiene un padre, el cual un td, 
        //y en el td, tenemos id de la tarea que queremos borrar

        let element = $(this)[0].parentElement.parentElement;
        //aquie seleccionamos el boton y obtemos el task id
       let id = $(element).attr('taskId');
       //aqui le enviamos el id a nuestro banck, para que lo elemine
        $.post('task-delete.php',{id} , function(response){
            console.log("Respues es  del delente" , response)
        });
        obtenerTask();
    });

    //aqui vamos escuchar el boton que se precioso, para editar una tarea
    $(document).on('click' , '.task-item', function (){
        console.log("Editando Tarea");
        let element = $(this)[0].parentElement.parentElement;
        //del elementos, seleccionar el atributo id, con attr
        let id = $(element).attr('taskId');
        console.log(id);
        $.post('task-update.php', {id} , function(response){
            console.log(response);
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);
            edit = true;
        });
    });
    
});



  
