<?php

require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/../lib/php/devuelveErrorInterno.php";

try {
   $lista = [
      [ 
         'titulo' => '¿Por qué los programadores no juegan a las escondidas?',
         'desc' => 'Porque siempre encuentran todos los bugs.'
      ],
      [
         'titulo' => '¿Por qué los desarrolladores aman las colinas?',
         'desc' => 'Porque siempre les gusta hacer "deploy" en algo alto.'
      ],
      [
         'titulo' => 'Ana y el bucle infinito',
         'desc' => 'Ana estaba tan concentrada que se olvidó de poner una condición de salida... ¡y el programa nunca terminó!'
      ],      
      [
         'titulo' => '¿Por qué en Neza todos usan VPN?',
         'desc' => 'Porque así es más difícil encontrarlos... ¡ni el coyote los puede rastrear!'
      ],
      [
         'titulo' => '¿Qué hace un programador en San Francisco?',
         'desc' => 'Debuggear... y después debuggear un poco más..'
      ],
      [
         'titulo' => 'Neza y el soporte técnico',
         'desc' => 'Dicen que en Neza encuentras de todo... menos a alguien que te ayude con los errores de JavaScript.'
      ]
      ];

   // Genera el código HTML de la lista.
   $render = "";
   foreach ($lista as $modelo) {
   $titulo = htmlentities($modelo["titulo"]);
   $desc = htmlentities($modelo["desc"]);
   $render .= "
      <li class=\"md-two-line\">
         <span class=\"headline\">{$titulo}</span>
         <span class=\"supporting\">{$desc}</span>
      </li>
   ";

   }

   devuelveJson(["lista" => ["innerHTML" => $render]]);
   } catch (Throwable $error) {

   devuelveErrorInterno($error);
   }
