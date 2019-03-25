"use strict";

module.exports = Producto => {
  Producto.getproducts = function (cb) {
    let query = "SELECT * FROM PRODUCTO";
    let params = "";
    let ds = Producto.dataSource;

    ds.connector.execute(query, params, (err, result) => {
      if (err) {
        console.log(`Error ${err}`);
      } else {
        cb(null, result);
      }
    });
  };

  Producto.postProducts = function (data, cb) {
    console.log("Datos de entrada / cuerpo raiz");
    console.log(data);

    let nombre;
    let descripcion;
    let imagen;

    if (data != null) {
      nombre = data.nombre;
      descripcion = data.descripcion;
      imagen = data.imagen;
    }

    let ds = Producto.dataSource;

    ds.connector.execute(
      `INSERT INTO PRODUCTO (nombre, descripcion, imagen) VALUES ('${nombre}', '${descripcion}', '${imagen}')`,
      (err, result) => {
        if (err) {
          console.log(`Error ${err}`);
        } else {
          console.log("Registró correctamente");
          cb(null, "Regitró correctamente");
        }
      }
    );
  };

  Producto.deleteProducts = function (data, cb) {
    console.log("Datos de entrada / cuerpo raiz");
    console.log(data);

    let id;

    if (data != null) {
      id = data.id;
    }

    let ds = Producto.dataSource;

    ds.connector.execute(
      `DELETE FROM producto WHERE producto.idproducto = ${id}`,
      (err, result) => {
        if (err) {
          console.log(`Error ${err}`);
        } else {
          console.log("Se eliminó correctamente");
          cb(null, "Se eliminó correctamente");
        }
      }
    );
  };

  Producto.remoteMethod("getproducts", {
    isStatic: true,
    returns: {
      root: true,
      type: "object"
    },
    http: {
      path: "/productos",
      verb: "get"
    }
  });

  Producto.remoteMethod("postProducts", {
    accepts: {
      arg: "data",
      type: "object",
      http: {
        source: "body"
      }
    },
    returns: {
      arg: "message",
      type: "object"
    },
    http: {
      path: "/productos",
      verb: "post"
    }
  });

  Producto.remoteMethod("deleteProducts", {
    accepts: {
      arg: "data",
      type: "object",
      http: {
        source: "body"
      }
    },
    returns: {
      arg: "message",
      type: "object"
    },
    http: {
      path: "/productos",
      verb: "delete"
    }
  });

};
