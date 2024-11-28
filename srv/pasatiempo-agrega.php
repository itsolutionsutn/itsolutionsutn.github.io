<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaTexto.php";
require_once __DIR__ . "/../lib/php/validaNombre.php";
require_once __DIR__ . "/../lib/php/insert.php";
require_once __DIR__ . "/../lib/php/devuelveCreated.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/TABLA_NOTAS.php";

ejecutaServicio(function () {

    $nombre = recuperaTexto("nombre");

    $nombre = validaNombre($nombre);

    $categoria = recuperaTexto("categoria");

    $categoria = validaNombre($categoria);

    $description = recuperaTexto("description");

    $description = validaNombre($description);

    $pdo = Bd::pdo();
    insert(pdo: $pdo, into: NOTAS, values: [
        "NOT_NOMBRE" => $nombre,
        "NOT_CATEGO" => $categoria,
        "NOT_DESCIP" => $description,
    ]);
    $id = $pdo->lastInsertId();

    $encodeId = urlencode($id);
    devuelveCreated("/srv/pasatiempo.php?id=$encodeId", [
    "id" => ["value" => $id],
    "nombre" => ["value" => $nombre],
    "categoria" => ["value" => $categoria],
    "descripcion" => ["value" => $description],
    ]);
});
