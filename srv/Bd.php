<?php

class Bd
{
  private static ?PDO $pdo = null;

  static function pdo(): PDO
  {
    if (self::$pdo === null) {

    self::$pdo = new PDO(
      // cadena de conexión
      "sqlite:srvbd.db",
      // usuario
      null,
      // contraseña
      null,
      // Opciones: pdos no persistentes y lanza excepciones.
      [PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    self::$pdo->exec(
      "CREATE TABLE IF NOT EXISTS NOTAS (
        NOT_ID INTEGER,
        NOT_NOMBRE TEXT NOT NULL,
        NOT_CATEGO TEXT NOT NULL,
        NOT_DESCIP TEXT NOT NULL,
        CONSTRAINT PAS_PK
        PRIMARY KEY(NOT_ID),
        CONSTRAINT PAS_NOM_UNQ
        UNIQUE(NOT_NOMBRE),
        CONSTRAINT PAS_NOM_NV
        CHECK(LENGTH(NOT_NOMBRE) > 0)
      )"
    );
    }

    return self::$pdo;
  }
}
