<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/select.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/TABLA_NOTAS.php";

ejecutaServicio(function () {

 $lista = select(pdo: Bd::pdo(),  from: NOTAS,  orderBy: NOT_NOMBRE);

 $render = "";
 foreach ($lista as $modelo) {
  $encodeId = urlencode($modelo[NOT_ID]);
  $id = htmlentities($encodeId);
  $nombre = htmlentities($modelo[NOT_NOMBRE]);
  $descripcion = htmlentities($modelo[NOT_DESCIP]);

  $render .=
    '<li class="md-two-line">
      <span class="headline">
          <a href="modifica.html?id=' . $id . '">' . $nombre . '</a>
      </span>
      <span class="supporting">
          ' . $descripcion . '
      </span>
    </li>';

 }

 devuelveJson(["lista" => ["innerHTML" => $render]]);
});
