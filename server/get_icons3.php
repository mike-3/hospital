<?php
ini_set('html_errors', false);
$method = $_SERVER['REQUEST_METHOD'];

if($method == 'GET'){
    $out = file_get_contents('data/icons5.json');
} else {

}

if(is_string($out)) echo($out);
else{
    header('Content-type: application/json');
    echo json_encode($out);
}

?>