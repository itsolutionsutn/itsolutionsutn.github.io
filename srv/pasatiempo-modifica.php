<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaIdEntero.php";
require_once __DIR__ . "/../lib/php/recuperaTexto.php";
require_once __DIR__ . "/../lib/php/validaNombre.php";
require_once __DIR__ . "/../lib/php/update.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/TABLA_NOTAS.php";

ejecutaServicio(function () {

    $id = recuperaIdEntero("id");

    $nombre = recuperaTexto("nombre");
    $nombre = validaNombre($nombre);

    $categoria = recuperaTexto("categoria");
    $categoria = validaCategoria($categoria); 

    $descripcion = recuperaTexto("descripcion");
    $descripcion = validaDescripcion($descripcion); 

    update(
        pdo: Bd::pdo(),
        table: NOTAS,
        set: [
            "NOT_NOMBRE" => $nombre,
            "NOT_CATEGO" => $categoria,
            "NOT_DESCIP" => $descripcion
        ],
        where: ["NOT_ID" => $id]
    );

    devuelveJson([
        "id" => ["value" => $id],
        "nombre" => ["value" => $nombre],
        "categoria" => ["value" => $categoria],
        "descripcion" => ["value" => $descripcion],
    ]);
});

