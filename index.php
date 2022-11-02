<?php 
require 'vendor/autoload.php';

use GuzzleHttp\Client;


$client = new Client();

$respones = $client->request('GET', 'http://www.omdbapi.com',[ 
'query' => [
    'apikey' => '2111bd7b',
    's' => 'one piece'
]
]);

$result = json_decode($respones->getBody()->getContents(), true);


?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php foreach ($result['Search'] as $r):?>
<ul>
    <li><img src=" <?= $r['Poster'] ;?> " alt=""></li>
    <li><?= $r['Title'] ;?></li> 
    <li><?= $r['Year'] ;?></li> 
</ul>
    <?php endforeach ;?>
</body>
</html>