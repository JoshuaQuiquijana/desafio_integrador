
/* ========================================================= */
/* PARTE I - ERRORES */
/* ========================================================= */

function calcularErrores() {

    let datos = [
        {
            nombre: "Ingreso diario",
            real: parseFloat(document.getElementById("real1").value),
            aprox: parseFloat(document.getElementById("aprox1").value)
        },
        {
            nombre: "Costo operativo",
            real: parseFloat(document.getElementById("real2").value),
            aprox: parseFloat(document.getElementById("aprox2").value)
        },
        {
            nombre: "Ganancia estimada",
            real: parseFloat(document.getElementById("real3").value),
            aprox: parseFloat(document.getElementById("aprox3").value)
        }
    ];

    let mayorError = -1;
    let datoMayor = "";

    let html = "";

    html += "<h3>Resultados de los errores</h3>";

    html += `
        <table class="tabla-resultado">
            <tr>
                <th>Dato</th>
                <th>Error absoluto</th>
                <th>Error relativo</th>
                <th>Error porcentual</th>
            </tr>
    `;

    for (let i = 0; i < datos.length; i++) {

        let real = datos[i].real;
        let aprox = datos[i].aprox;

        let Ea = Math.abs(real - aprox);
        let Er = Ea / Math.abs(real);
        let Ep = Er * 100;

        if (Ep > mayorError) {
            mayorError = Ep;
            datoMayor = datos[i].nombre;
        }

        html += `
            <tr>
                <td>${datos[i].nombre}</td>
                <td>${Ea.toFixed(2)}</td>
                <td>${Er.toFixed(6)}</td>
                <td>${Ep.toFixed(2)}%</td>
            </tr>
        `;
    }

    html += "</table>";

    html += `
        <button class="boton-procedimiento"
                onclick="mostrarOcultar('procedimientoErrores', this)">
            Mostrar procedimiento
        </button>

        <div id="procedimientoErrores" class="procedimiento" style="display:none;">

            <h3>Procedimiento</h3>

            <div class="formula">
                Error absoluto:
                Ea = |x_real - x_aproximado|
            </div>

            <div class="formula">
                Error relativo:
                Er = Ea / |x_real|
            </div>

            <div class="formula">
                Error porcentual:
                E% = Er × 100
            </div>
    `;

    for (let i = 0; i < datos.length; i++) {

        let real = datos[i].real;
        let aprox = datos[i].aprox;

        let Ea = Math.abs(real - aprox);
        let Er = Ea / Math.abs(real);
        let Ep = Er * 100;

        html += `
            <h4>${datos[i].nombre}</h4>

            <p>
                Ea = |${real} - ${aprox}|
                = ${Ea.toFixed(2)}
            </p>

            <p>
                Er = ${Ea.toFixed(2)} / ${Math.abs(real).toFixed(2)}
                = ${Er.toFixed(6)}
            </p>

            <p>
                E% = ${Er.toFixed(6)} × 100
                = ${Ep.toFixed(2)}%
            </p>
        `;
    }

    html += "</div>";

    html += `
        <div class="conclusion">

            <h3>Conclusión de la Parte I</h3>

            <p>
                El dato que presenta el mayor error porcentual es
                <strong>${datoMayor}</strong>, con un error de
                <strong>${mayorError.toFixed(2)}%</strong>.
            </p>

            <p>
                Esto significa que este valor presenta la mayor diferencia
                proporcional respecto a su valor real. En una empresa,
                un error en ingresos o costos puede provocar una
                interpretación incorrecta de la situación financiera y
                afectar decisiones relacionadas con presupuesto,
                inversión o distribución de recursos.
            </p>

        </div>
    `;

    document.getElementById("resultadoErrores").innerHTML = html;
}


/* ========================================================= */
/* PARTE II - TAYLOR */
/* ========================================================= */

function calcularTaylor() {

    let capital = parseFloat(document.getElementById("capital").value);
    let tasa = parseFloat(document.getElementById("tasa").value);
    let t0 = parseFloat(document.getElementById("t0").value);
    let t = parseFloat(document.getElementById("t").value);

    let h = t - t0;

    function funcion(tiempo) {
        return capital * Math.exp(tasa * tiempo);
    }

    let C0 = funcion(t0);

    let C1 = capital * tasa * Math.exp(tasa * t0);
    let C2 = capital * tasa * tasa * Math.exp(tasa * t0);
    let C3 = capital * tasa * tasa * tasa * Math.exp(tasa * t0);

    let exacto = funcion(t);

    let T1 = C0 + C1 * h;

    let T2 = C0 +
             C1 * h +
             (C2 / 2) * Math.pow(h, 2);

    let T3 = C0 +
             C1 * h +
             (C2 / 2) * Math.pow(h, 2) +
             (C3 / 6) * Math.pow(h, 3);

    let error1 = Math.abs(exacto - T1);
    let error2 = Math.abs(exacto - T2);
    let error3 = Math.abs(exacto - T3);

    let mejor = "Orden 1";
    let menorError = error1;

    if (error2 < menorError) {
        menorError = error2;
        mejor = "Orden 2";
    }

    if (error3 < menorError) {
        menorError = error3;
        mejor = "Orden 3";
    }

    let html = "";

    html += "<h3>Resultados de Taylor</h3>";

    html += `
        <table class="tabla-resultado">
            <tr>
                <th>Aproximación</th>
                <th>Valor</th>
                <th>Error absoluto</th>
            </tr>

            <tr>
                <td>Taylor orden 1</td>
                <td>${T1.toFixed(6)}</td>
                <td>${error1.toFixed(6)}</td>
            </tr>

            <tr>
                <td>Taylor orden 2</td>
                <td>${T2.toFixed(6)}</td>
                <td>${error2.toFixed(6)}</td>
            </tr>

            <tr>
                <td>Taylor orden 3</td>
                <td>${T3.toFixed(6)}</td>
                <td>${error3.toFixed(6)}</td>
            </tr>

            <tr>
                <td>Valor exacto</td>
                <td>${exacto.toFixed(6)}</td>
                <td>-</td>
            </tr>
        </table>

        <div class="resultado-final">
            <strong>Mejor aproximación:</strong>
            ${mejor}
            <br>
            <strong>Menor error:</strong>
            ${menorError.toFixed(6)}
        </div>

        <button class="boton-procedimiento"
                onclick="mostrarOcultar('procedimientoTaylor', this)">
            Mostrar procedimiento
        </button>

        <div id="procedimientoTaylor" class="procedimiento" style="display:none;">

            <h3>Procedimiento</h3>

            <p>
                La función financiera es:
            </p>

            <div class="formula">
                C(t) = ${capital}e^(${tasa}t)
            </div>

            <p>
                Se tiene:
            </p>

            <div class="formula">
                t₀ = ${t0}
                <br>
                t = ${t}
                <br>
                h = t - t₀ = ${h.toFixed(4)}
            </div>

            <p>
                Valor en el punto de expansión:
            </p>

            <div class="formula">
                C(t₀) = ${C0.toFixed(6)}
            </div>

            <p>
                Primera derivada:
            </p>

            <div class="formula">
                C'(t) = ${capital * tasa}e^(${tasa}t)
                <br>
                C'(${t0}) = ${C1.toFixed(6)}
            </div>

            <p>
                Segunda derivada:
            </p>

            <div class="formula">
                C''(t) = ${capital * tasa * tasa}e^(${tasa}t)
                <br>
                C''(${t0}) = ${C2.toFixed(6)}
            </div>

            <p>
                Tercera derivada:
            </p>

            <div class="formula">
                C'''(t) = ${capital * tasa * tasa * tasa}e^(${tasa}t)
                <br>
                C'''(${t0}) = ${C3.toFixed(6)}
            </div>

            <h4>Taylor de orden 1</h4>

            <div class="formula">
                T₁(t) = C(t₀) + C'(t₀)h
                <br><br>
                T₁ = ${C0.toFixed(6)}
                + ${C1.toFixed(6)}(${h.toFixed(4)})
                <br>
                T₁ = ${T1.toFixed(6)}
            </div>

            <h4>Taylor de orden 2</h4>

            <div class="formula">
                T₂(t) =
                C(t₀) + C'(t₀)h
                + [C''(t₀)/2]h²
                <br><br>
                T₂ = ${T2.toFixed(6)}
            </div>

            <h4>Taylor de orden 3</h4>

            <div class="formula">
                T₃(t) =
                C(t₀) + C'(t₀)h
                + [C''(t₀)/2]h²
                + [C'''(t₀)/6]h³
                <br><br>
                T₃ = ${T3.toFixed(6)}
            </div>

            <h4>Valor exacto</h4>

            <div class="formula">
                C(${t}) =
                ${capital}e^(${tasa}(${t}))
                = ${exacto.toFixed(6)}
            </div>

            <h4>Cálculo de errores</h4>

            <p>
                Error orden 1 =
                |${exacto.toFixed(6)} - ${T1.toFixed(6)}|
                = ${error1.toFixed(6)}
            </p>

            <p>
                Error orden 2 =
                |${exacto.toFixed(6)} - ${T2.toFixed(6)}|
                = ${error2.toFixed(6)}
            </p>

            <p>
                Error orden 3 =
                |${exacto.toFixed(6)} - ${T3.toFixed(6)}|
                = ${error3.toFixed(6)}
            </p>

        </div>

        <div class="conclusion">

            <h3>Conclusión de la Parte II</h3>

            <p>
                La aproximación de <strong>${mejor}</strong> presenta el
                menor error, con un valor de
                <strong>${menorError.toFixed(6)}</strong>.
            </p>

            <p>
                Esto significa que al aumentar el orden del polinomio
                normalmente se incorporan más términos de la función y
                se obtiene una representación más cercana al valor real.
                Por lo tanto, una aproximación de mayor precisión puede
                ser más útil cuando se necesitan estimaciones financieras
                confiables.
            </p>

        </div>
    `;

    document.getElementById("resultadoTaylor").innerHTML = html;
}


/* ========================================================= */
/* FUNCION PARA MOSTRAR / OCULTAR PROCEDIMIENTOS */
/* ========================================================= */

function mostrarOcultar(id, boton) {

    let elemento = document.getElementById(id);

    if (elemento.style.display === "none") {

        elemento.style.display = "block";
        boton.textContent = "Ocultar procedimiento";

    } else {

        elemento.style.display = "none";
        boton.textContent = "Mostrar procedimiento";
    }
}


/* ========================================================= */
/* PARTE III - CAMBIO DE CASO */
/* ========================================================= */

function cambiarCaso() {

    let tipo = document.getElementById("tipoCaso").value;

    let contenedor = document.getElementById("contenidoCaso");

    /*
       Importante:
       innerHTML reemplaza completamente el contenido anterior.
       Por eso los casos NO se acumulan.
    */

    if (tipo === "ideal") {
        mostrarCasoIdeal();
    }

    if (tipo === "estres") {
        mostrarCasoEstres();
    }

    if (tipo === "mal") {
        mostrarCasoMal();
    }
}


/* ========================================================= */
/* CASO IDEAL */
/* ========================================================= */

function mostrarCasoIdeal() {

    let contenedor = document.getElementById("contenidoCaso");

    contenedor.innerHTML = `

        <div class="caso">

            <h3>Caso ideal</h3>

            <p>
                Sistema financiero original:
            </p>

            <div class="sistema">
                10x₁ + 2x₂ + x₃ = 29
                <br>
                x₁ + 9x₂ + 2x₃ = 25
                <br>
                2x₁ + x₂ + 8x₃ = 28
            </div>

            <h4>Matriz aumentada</h4>

            <div id="matrizIdeal" class="matriz-container"></div>

            <button onclick="crearMatrizIdeal()">
                Crear matriz
            </button>

            <button onclick="resolverExacta()">
                Solución exacta
            </button>

            <button onclick="resolverLU()">
                Resolver con LU
            </button>

            <button onclick="resolverJacobi()">
                Resolver con Jacobi
            </button>

            <button onclick="resolverSeidel()">
                Resolver con Seidel
            </button>

            <button onclick="compararMetodos()">
                Comparar métodos
            </button>

            <div id="resultadoIdeal"></div>

        </div>
    `;

    crearMatrizIdeal();
}


/* ========================================================= */
/* CREAR MATRIZ IDEAL */
/* ========================================================= */

function crearMatrizIdeal() {

    let contenedor = document.getElementById("matrizIdeal");

    contenedor.innerHTML = "";

    let valores = [
        [10, 2, 1, 29],
        [1, 9, 2, 25],
        [2, 1, 8, 28]
    ];

    for (let i = 0; i < 3; i++) {

        let fila = document.createElement("div");
        fila.className = "fila-matriz";

        for (let j = 0; j < 4; j++) {

            if (j === 3) {

                let separador = document.createElement("div");
                separador.className = "separador";

                fila.appendChild(separador);
            }

            let input = document.createElement("input");

            input.type = "number";
            input.className = "celda-matriz";
            input.id = "m" + i + j;
            input.value = valores[i][j];

            fila.appendChild(input);
        }

        contenedor.appendChild(fila);
    }
}


/* ========================================================= */
/* OBTENER MATRIZ IDEAL */
/* ========================================================= */

function obtenerMatrizIdeal() {

    let matriz = [];

    for (let i = 0; i < 3; i++) {

        matriz[i] = [];

        for (let j = 0; j < 4; j++) {

            let valor = parseFloat(
                document.getElementById("m" + i + j).value
            );

            matriz[i][j] = valor;
        }
    }

    return matriz;
}


/* ========================================================= */
/* SOLUCION EXACTA - GAUSS */
/* ========================================================= */

function resolverExacta() {

    let A = obtenerMatrizIdeal();

    let resultado = gauss(A);

    let html = `
        <div class="resultado">

            <h3>Solución exacta</h3>

            <p>
                Se utiliza eliminación de Gauss para transformar
                la matriz aumentada hasta obtener una forma triangular
                y posteriormente realizar sustitución regresiva.
            </p>

            <div class="resultado-final">
                x₁ = ${resultado[0].toFixed(6)}
                <br>
                x₂ = ${resultado[1].toFixed(6)}
                <br>
                x₃ = ${resultado[2].toFixed(6)}
            </div>

            <button class="boton-procedimiento"
                    onclick="mostrarOcultar('procExacta', this)">
                Mostrar procedimiento
            </button>

            <div id="procExacta"
                 class="procedimiento"
                 style="display:none;">

                <h3>Procedimiento</h3>

                <p>
                    Matriz aumentada inicial:
                </p>

                <div class="formula">
                    [
                    ${A[0][0]} ${A[0][1]} ${A[0][2]} | ${A[0][3]}
                    ]
                    <br>
                    [
                    ${A[1][0]} ${A[1][1]} ${A[1][2]} | ${A[1][3]}
                    ]
                    <br>
                    [
                    ${A[2][0]} ${A[2][1]} ${A[2][2]} | ${A[2][3]}
                    ]
                </div>

                <p>
                    Se realizan operaciones elementales entre filas
                    para eliminar los elementos que se encuentran
                    debajo de la diagonal principal.
                </p>

                <p>
                    Finalmente se obtiene un sistema triangular
                    y se aplica sustitución regresiva.
                </p>

                <p>
                    Resultado:
                </p>

                <div class="formula">
                    x₁ = ${resultado[0].toFixed(6)}
                    <br>
                    x₂ = ${resultado[1].toFixed(6)}
                    <br>
                    x₃ = ${resultado[2].toFixed(6)}
                </div>

            </div>

            <div class="conclusion">

                <h3>Conclusión</h3>

                <p>
                    La solución exacta representa la distribución de
                    recursos que satisface simultáneamente las tres
                    ecuaciones financieras del caso ideal.
                </p>

            </div>

        </div>
    `;

    document.getElementById("resultadoIdeal").innerHTML = html;
}


/* ========================================================= */
/* GAUSS */
/* ========================================================= */

function gauss(matriz) {

    let A = [];

    for (let i = 0; i < matriz.length; i++) {
        A[i] = matriz[i].slice();
    }

    let n = 3;

    for (let k = 0; k < n - 1; k++) {

        for (let i = k + 1; i < n; i++) {

            let factor = A[i][k] / A[k][k];

            for (let j = k; j <= n; j++) {

                A[i][j] =
                    A[i][j] -
                    factor * A[k][j];
            }
        }
    }

    let x = [];

    x[2] = A[2][3] / A[2][2];

    x[1] =
        (A[1][3] - A[1][2] * x[2]) /
        A[1][1];

    x[0] =
        (A[0][3] -
            A[0][2] * x[2] -
            A[0][1] * x[1]) /
        A[0][0];

    return x;
}


/* ========================================================= */
/* LU */
/* ========================================================= */

function resolverLU() {

    let Aumentada = obtenerMatrizIdeal();

    let A = [
        [Aumentada[0][0], Aumentada[0][1], Aumentada[0][2]],
        [Aumentada[1][0], Aumentada[1][1], Aumentada[1][2]],
        [Aumentada[2][0], Aumentada[2][1], Aumentada[2][2]]
    ];

    let b = [
        Aumentada[0][3],
        Aumentada[1][3],
        Aumentada[2][3]
    ];

    let resultado = calcularLU(A, b);

    let html = `

        <div class="resultado">

            <h3>Método LU</h3>

            <div class="resultado-final">
                x₁ = ${resultado.x[0].toFixed(6)}
                <br>
                x₂ = ${resultado.x[1].toFixed(6)}
                <br>
                x₃ = ${resultado.x[2].toFixed(6)}
            </div>

            <button class="boton-procedimiento"
                    onclick="mostrarOcultar('procLU', this)">
                Mostrar procedimiento
            </button>

            <div id="procLU"
                 class="procedimiento"
                 style="display:none;">

                <h3>Procedimiento</h3>

                <p>
                    Se descompone la matriz A como:
                </p>

                <div class="formula">
                    A = L · U
                </div>

                <h4>Matriz L</h4>

                <div class="formula">
                    ${matrizTexto(resultado.L)}
                </div>

                <h4>Matriz U</h4>

                <div class="formula">
                    ${matrizTexto(resultado.U)}
                </div>

                <p>
                    Luego se resuelve:
                </p>

                <div class="formula">
                    L · y = b
                    <br>
                    U · x = y
                </div>

                <p>
                    Vector intermedio:
                </p>

                <div class="formula">
                    y₁ = ${resultado.y[0].toFixed(6)}
                    <br>
                    y₂ = ${resultado.y[1].toFixed(6)}
                    <br>
                    y₃ = ${resultado.y[2].toFixed(6)}
                </div>

            </div>

            <div class="conclusion">

                <h3>Conclusión</h3>

                <p>
                    El método LU permite descomponer el sistema en dos
                    sistemas triangulares. Esto facilita la obtención
                    de la solución y es especialmente útil cuando se
                    necesita resolver varios sistemas con la misma
                    matriz A.
                </p>

            </div>

        </div>
    `;

    document.getElementById("resultadoIdeal").innerHTML += html;
}


/* ========================================================= */
/* CALCULO LU */
/* ========================================================= */

function calcularLU(A, b) {

    let n = 3;

    let L = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];

    let U = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    for (let i = 0; i < n; i++) {

        for (let k = i; k < n; k++) {

            let suma = 0;

            for (let j = 0; j < i; j++) {
                suma += L[i][j] * U[j][k];
            }

            U[i][k] = A[i][k] - suma;
        }

        for (let k = i + 1; k < n; k++) {

            let suma = 0;

            for (let j = 0; j < i; j++) {
                suma += L[k][j] * U[j][i];
            }

            L[k][i] =
                (A[k][i] - suma) /
                U[i][i];
        }
    }

    let y = [];

    y[0] = b[0];

    y[1] =
        b[1] -
        L[1][0] * y[0];

    y[2] =
        b[2] -
        L[2][0] * y[0] -
        L[2][1] * y[1];

    let x = [];

    x[2] =
        y[2] / U[2][2];

    x[1] =
        (y[1] - U[1][2] * x[2]) /
        U[1][1];

    x[0] =
        (y[0] -
            U[0][1] * x[1] -
            U[0][2] * x[2]) /
        U[0][0];

    return {
        L: L,
        U: U,
        y: y,
        x: x
    };
}


/* ========================================================= */
/* JACOBI */
/* ========================================================= */

function resolverJacobi() {

    let A = obtenerMatrizIdeal();

    let tol = 0.000001;
    let maxIter = 50;

    let resultado =
        metodoIterativo(A, tol, maxIter, false);

    mostrarIterativo(
        resultado,
        "Jacobi",
        A
    );
}


/* ========================================================= */
/* SEIDEL */
/* ========================================================= */

function resolverSeidel() {

    let A = obtenerMatrizIdeal();

    let tol = 0.000001;
    let maxIter = 50;

    let resultado =
        metodoIterativo(A, tol, maxIter, true);

    mostrarIterativo(
        resultado,
        "Gauss-Seidel",
        A
    );
}


/* ========================================================= */
/* METODO ITERATIVO */
/* ========================================================= */

function metodoIterativo(
    matriz,
    tolerancia,
    maxIteraciones,
    seidel
) {

    let x = [0, 0, 0];

    let historial = [];

    let convergio = false;

    for (let iter = 1; iter <= maxIteraciones; iter++) {

        let anterior = x.slice();

        if (seidel) {

            x[0] =
                (matriz[0][3] -
                    matriz[0][1] * x[1] -
                    matriz[0][2] * x[2]) /
                matriz[0][0];

            x[1] =
                (matriz[1][3] -
                    matriz[1][0] * x[0] -
                    matriz[1][2] * x[2]) /
                matriz[1][1];

            x[2] =
                (matriz[2][3] -
                    matriz[2][0] * x[0] -
                    matriz[2][1] * x[1]) /
                matriz[2][2];

        } else {

            let nuevo = [];

            nuevo[0] =
                (matriz[0][3] -
                    matriz[0][1] * anterior[1] -
                    matriz[0][2] * anterior[2]) /
                matriz[0][0];

            nuevo[1] =
                (matriz[1][3] -
                    matriz[1][0] * anterior[0] -
                    matriz[1][2] * anterior[2]) /
                matriz[1][1];

            nuevo[2] =
                (matriz[2][3] -
                    matriz[2][0] * anterior[0] -
                    matriz[2][1] * anterior[1]) /
                matriz[2][2];

            x = nuevo;
        }

        let error = Math.max(
            Math.abs(x[0] - anterior[0]),
            Math.abs(x[1] - anterior[1]),
            Math.abs(x[2] - anterior[2])
        );

        historial.push({
            iteracion: iter,
            x1: x[0],
            x2: x[1],
            x3: x[2],
            error: error
        });

        if (error <= tolerancia) {

            convergio = true;
            break;
        }
    }

    return {
        x: x,
        historial: historial,
        convergio: convergio
    };
}


/* ========================================================= */
/* MOSTRAR ITERATIVO */
/* ========================================================= */

function mostrarIterativo(resultado, nombre, matriz) {

    let id =
        nombre === "Jacobi"
            ? "procJacobi"
            : "procSeidel";

    let html = `

        <div class="resultado">

            <h3>${nombre}</h3>

            <div class="resultado-final">

                x₁ = ${resultado.x[0].toFixed(6)}
                <br>

                x₂ = ${resultado.x[1].toFixed(6)}
                <br>

                x₃ = ${resultado.x[2].toFixed(6)}
                <br><br>

                Iteraciones:
                ${resultado.historial.length}

                <br>

                Convergencia:
                ${resultado.convergio ? "Sí" : "No"}

            </div>

            <h4>Iteraciones</h4>

            <div class="tabla-iteraciones">

                <table class="tabla-resultado">

                    <tr>
                        <th>Iteración</th>
                        <th>x₁</th>
                        <th>x₂</th>
                        <th>x₃</th>
                        <th>Error</th>
                    </tr>
    `;

    for (let i = 0; i < resultado.historial.length; i++) {

        let fila = resultado.historial[i];

        html += `
            <tr>
                <td>${fila.iteracion}</td>
                <td>${fila.x1.toFixed(6)}</td>
                <td>${fila.x2.toFixed(6)}</td>
                <td>${fila.x3.toFixed(6)}</td>
                <td>${fila.error.toFixed(8)}</td>
            </tr>
        `;
    }

    html += `
                </table>

            </div>

            <button class="boton-procedimiento"
                    onclick="mostrarOcultar('${id}', this)">
                Mostrar procedimiento
            </button>

            <div id="${id}"
                 class="procedimiento"
                 style="display:none;">

                <h3>Procedimiento</h3>

                <p>
                    Vector inicial:
                </p>

                <div class="formula">
                    X⁽⁰⁾ = (0, 0, 0)
                </div>

                <p>
                    Tolerancia:
                    <strong>10⁻⁶</strong>
                </p>

                <p>
                    Máximo de iteraciones:
                    <strong>50</strong>
                </p>
    `;

    if (nombre === "Jacobi") {

        html += `
            <h4>Fórmulas de Jacobi</h4>

            <div class="formula">
                x₁ = (b₁ - a₁₂x₂ - a₁₃x₃) / a₁₁
                <br>
                x₂ = (b₂ - a₂₁x₁ - a₂₃x₃) / a₂₂
                <br>
                x₃ = (b₃ - a₃₁x₁ - a₃₂x₂) / a₃₃
            </div>

            <p>
                En cada iteración se utilizan los valores de la
                iteración anterior para calcular todos los nuevos valores.
            </p>
        `;

    } else {

        html += `
            <h4>Fórmulas de Gauss-Seidel</h4>

            <div class="formula">
                x₁ = (b₁ - a₁₂x₂ - a₁₃x₃) / a₁₁
                <br>
                x₂ = (b₂ - a₂₁x₁ - a₂₃x₃) / a₂₂
                <br>
                x₃ = (b₃ - a₃₁x₁ - a₃₂x₂) / a₃₃
            </div>

            <p>
                A diferencia de Jacobi, Seidel utiliza inmediatamente
                los valores nuevos calculados dentro de la misma
                iteración.
            </p>
        `;
    }

    html += `

                <h4>Primeras iteraciones</h4>
    `;

    let limite = resultado.historial.length;

    if (limite > 5) {
        limite = 5;
    }

    for (let i = 0; i < limite; i++) {

        let fila = resultado.historial[i];

        html += `
            <p>
                Iteración ${fila.iteracion}:
                x₁ = ${fila.x1.toFixed(6)},
                x₂ = ${fila.x2.toFixed(6)},
                x₃ = ${fila.x3.toFixed(6)},
                error = ${fila.error.toFixed(8)}
            </p>
        `;
    }

    html += `

                <p>
                    El proceso continúa hasta que el error sea menor
                    o igual a la tolerancia establecida.
                </p>

            </div>

            <div class="conclusion">

                <h3>Conclusión</h3>

                <p>
                    El método ${nombre} obtuvo una solución
                    ${resultado.convergio ? "convergente" : "no convergente"}.
                    La cantidad de iteraciones indica qué tan rápido
                    se acerca el método a la solución bajo la tolerancia
                    establecida.
                </p>

            </div>

        </div>
    `;

    document.getElementById("resultadoIdeal").innerHTML += html;
}


/* ========================================================= */
/* COMPARACION DE METODOS */
/* ========================================================= */

function compararMetodos() {

    let A = obtenerMatrizIdeal();

    let exacta = gauss(A);

    let Aobj = [
        [A[0][0], A[0][1], A[0][2]],
        [A[1][0], A[1][1], A[1][2]],
        [A[2][0], A[2][1], A[2][2]]
    ];

    let b = [
        A[0][3],
        A[1][3],
        A[2][3]
    ];

    let lu = calcularLU(Aobj, b);

    let jacobi =
        metodoIterativo(A, 0.000001, 50, false);

    let seidel =
        metodoIterativo(A, 0.000001, 50, true);

    let html = `

        <div class="resultado">

            <h3>Comparación de métodos</h3>

            <table class="tabla-resultado">

                <tr>
                    <th>Método</th>
                    <th>x₁</th>
                    <th>x₂</th>
                    <th>x₃</th>
                    <th>Iteraciones</th>
                </tr>

                <tr>
                    <td>Exacta</td>
                    <td>${exacta[0].toFixed(6)}</td>
                    <td>${exacta[1].toFixed(6)}</td>
                    <td>${exacta[2].toFixed(6)}</td>
                    <td>-</td>
                </tr>

                <tr>
                    <td>LU</td>
                    <td>${lu.x[0].toFixed(6)}</td>
                    <td>${lu.x[1].toFixed(6)}</td>
                    <td>${lu.x[2].toFixed(6)}</td>
                    <td>-</td>
                </tr>

                <tr>
                    <td>Jacobi</td>
                    <td>${jacobi.x[0].toFixed(6)}</td>
                    <td>${jacobi.x[1].toFixed(6)}</td>
                    <td>${jacobi.x[2].toFixed(6)}</td>
                    <td>${jacobi.historial.length}</td>
                </tr>

                <tr>
                    <td>Seidel</td>
                    <td>${seidel.x[0].toFixed(6)}</td>
                    <td>${seidel.x[1].toFixed(6)}</td>
                    <td>${seidel.x[2].toFixed(6)}</td>
                    <td>${seidel.historial.length}</td>
                </tr>

            </table>

            <button class="boton-procedimiento"
                    onclick="mostrarOcultar('procComparacion', this)">
                Mostrar procedimiento
            </button>

            <div id="procComparacion"
                 class="procedimiento"
                 style="display:none;">

                <h3>Procedimiento de comparación</h3>

                <p>
                    Se comparan los resultados obtenidos mediante
                    solución exacta, LU, Jacobi y Gauss-Seidel.
                </p>

                <p>
                    La solución exacta y LU sirven como referencia,
                    mientras que Jacobi y Seidel obtienen una solución
                    mediante aproximaciones sucesivas.
                </p>

                <p>
                    Jacobi realizó
                    <strong>${jacobi.historial.length}</strong>
                    iteraciones.
                </p>

                <p>
                    Gauss-Seidel realizó
                    <strong>${seidel.historial.length}</strong>
                    iteraciones.
                </p>

            </div>

            <div class="conclusion">

                <h3>Conclusión</h3>

                <p>
                    Los métodos directos como Gauss y LU obtienen la
                    solución mediante operaciones algebraicas, mientras
                    que Jacobi y Seidel se aproximan progresivamente.
                    El número de iteraciones permite observar la rapidez
                    con la que convergen los métodos iterativos.
                </p>

            </div>

        </div>
    `;

    document.getElementById("resultadoIdeal").innerHTML += html;
}


/* ========================================================= */
/* CASO BAJO ESTRÉS */
/* ========================================================= */

function mostrarCasoEstres() {

    let contenedor = document.getElementById("contenidoCaso");

    contenedor.innerHTML = `

        <div class="caso">

            <h3>Caso bajo estrés</h3>

            <p>
                Se mantienen los coeficientes del sistema original,
                pero cambian los recursos disponibles.
            </p>

            <div class="sistema">
                10x₁ + 2x₂ + x₃ = 29.5
                <br>
                x₁ + 9x₂ + 2x₃ = 24.5
                <br>
                2x₁ + x₂ + 8x₃ = 28.4
            </div>

            <button onclick="resolverEstres()">
                Resolver caso
            </button>

            <div id="resultadoEstres"></div>

        </div>
    `;
}


/* ========================================================= */
/* RESOLVER ESTRÉS */
/* ========================================================= */

function resolverEstres() {

    let matriz = [
        [10, 2, 1, 29.5],
        [1, 9, 2, 24.5],
        [2, 1, 8, 28.4]
    ];

    let jacobi =
        metodoIterativo(
            matriz,
            0.000001,
            50,
            false
        );

    let seidel =
        metodoIterativo(
            matriz,
            0.000001,
            50,
            true
        );

    let html = `

        <h3>Resultados del caso bajo estrés</h3>

        <table class="tabla-resultado">

            <tr>
                <th>Método</th>
                <th>x₁</th>
                <th>x₂</th>
                <th>x₃</th>
                <th>Iteraciones</th>
                <th>Convergencia</th>
            </tr>

            <tr>
                <td>Jacobi</td>
                <td>${jacobi.x[0].toFixed(6)}</td>
                <td>${jacobi.x[1].toFixed(6)}</td>
                <td>${jacobi.x[2].toFixed(6)}</td>
                <td>${jacobi.historial.length}</td>
                <td>${jacobi.convergio ? "Sí" : "No"}</td>
            </tr>

            <tr>
                <td>Seidel</td>
                <td>${seidel.x[0].toFixed(6)}</td>
                <td>${seidel.x[1].toFixed(6)}</td>
                <td>${seidel.x[2].toFixed(6)}</td>
                <td>${seidel.historial.length}</td>
                <td>${seidel.convergio ? "Sí" : "No"}</td>
            </tr>

        </table>

        <button class="boton-procedimiento"
                onclick="mostrarOcultar('procEstres', this)">
            Mostrar procedimiento
        </button>

        <div id="procEstres"
             class="procedimiento"
             style="display:none;">

            <h3>Procedimiento</h3>

            <h4>Jacobi</h4>

            <div class="formula">
                x₁ = (29.5 - 2x₂ - x₃) / 10
                <br>
                x₂ = (24.5 - x₁ - 2x₃) / 9
                <br>
                x₃ = (28.4 - 2x₁ - x₂) / 8
            </div>

            <p>
                Se parte del vector inicial:
                X⁽⁰⁾ = (0,0,0)
            </p>

            <p>
                Se calculan sucesivamente los nuevos valores utilizando
                los valores de la iteración anterior.
            </p>

            <h4>Gauss-Seidel</h4>

            <div class="formula">
                x₁ = (29.5 - 2x₂ - x₃) / 10
                <br>
                x₂ = (24.5 - x₁ - 2x₃) / 9
                <br>
                x₃ = (28.4 - 2x₁ - x₂) / 8
            </div>

            <p>
                En Seidel los valores recién calculados se utilizan
                inmediatamente en la misma iteración.
            </p>

            <p>
                Tolerancia utilizada:
                <strong>10⁻⁶</strong>.
            </p>

            <p>
                Máximo:
                <strong>50 iteraciones</strong>.
            </p>

        </div>

        <div class="conclusion">

            <h3>Conclusión del caso bajo estrés</h3>

            <p>
                El cambio en los valores del lado derecho modifica la
                distribución óptima de los recursos. Los métodos
                iterativos permiten observar cómo se adapta la solución
                ante una situación financiera diferente.
            </p>

            <p>
                Si un método necesita menos iteraciones, significa que
                alcanza la tolerancia establecida más rápidamente.
            </p>

        </div>
    `;

    document.getElementById("resultadoEstres").innerHTML = html;
}


/* ========================================================= */
/* CASO MAL CONDICIONADO */
/* ========================================================= */

function mostrarCasoMal() {

    let contenedor = document.getElementById("contenidoCaso");

    contenedor.innerHTML = `

        <div class="caso">

            <h3>Caso mal condicionado</h3>

            <p>
                Este sistema contiene coeficientes muy cercanos entre sí,
                por lo que pequeños cambios en los datos pueden producir
                cambios importantes en la solución.
            </p>

            <h4>Sistema original</h4>

            <div class="sistema">
                x₁ + x₂ + x₃ = 6
                <br>
                1.001x₁ + x₂ + x₃ = 6.001
                <br>
                x₁ + 1.001x₂ + x₃ = 6.002
            </div>

            <h4>Sistema modificado</h4>

            <div class="sistema">
                x₁ + x₂ + x₃ = 6
                <br>
                1.001x₁ + x₂ + x₃ = 6.001
                <br>
                x₁ + 1.001x₂ + x₃ = 6.003
            </div>

            <button onclick="resolverMalCondicionado()">
                Resolver caso
            </button>

            <div id="resultadoMal"></div>

        </div>
    `;
}


/* ========================================================= */
/* RESOLVER MAL CONDICIONADO */
/* ========================================================= */

function resolverMalCondicionado() {

    let A = [
        [1, 1, 1],
        [1.001, 1, 1],
        [1, 1.001, 1]
    ];

    let bOriginal = [
        6,
        6.001,
        6.002
    ];

    let bModificado = [
        6,
        6.001,
        6.003
    ];

    let original =
        calcularLU(A, bOriginal);

    let modificado =
        calcularLU(A, bModificado);

    let diferencia1 =
        Math.abs(
            modificado.x[0] -
            original.x[0]
        );

    let diferencia2 =
        Math.abs(
            modificado.x[1] -
            original.x[1]
        );

    let diferencia3 =
        Math.abs(
            modificado.x[2] -
            original.x[2]
        );

    let html = `

        <h3>Resultados del caso mal condicionado</h3>

        <table class="tabla-resultado">

            <tr>
                <th></th>
                <th>x₁</th>
                <th>x₂</th>
                <th>x₃</th>
            </tr>

            <tr>
                <td>Original</td>
                <td>${original.x[0].toFixed(6)}</td>
                <td>${original.x[1].toFixed(6)}</td>
                <td>${original.x[2].toFixed(6)}</td>
            </tr>

            <tr>
                <td>Modificado</td>
                <td>${modificado.x[0].toFixed(6)}</td>
                <td>${modificado.x[1].toFixed(6)}</td>
                <td>${modificado.x[2].toFixed(6)}</td>
            </tr>

            <tr>
                <td>Diferencia</td>
                <td>${diferencia1.toFixed(6)}</td>
                <td>${diferencia2.toFixed(6)}</td>
                <td>${diferencia3.toFixed(6)}</td>
            </tr>

        </table>

        <button class="boton-procedimiento"
                onclick="mostrarOcultar('procMal', this)">
            Mostrar procedimiento
        </button>

        <div id="procMal"
             class="procedimiento"
             style="display:none;">

            <h3>Procedimiento</h3>

            <p>
                Se utiliza el método LU:
            </p>

            <div class="formula">
                A = L · U
            </div>

            <h4>Sistema original</h4>

            <p>
                Se descompone la matriz A en L y U y posteriormente
                se resuelven los sistemas triangulares:
            </p>

            <div class="formula">
                L · y = b
                <br>
                U · x = y
            </div>

            <p>
                Solución original:
            </p>

            <div class="formula">
                x₁ = ${original.x[0].toFixed(6)}
                <br>
                x₂ = ${original.x[1].toFixed(6)}
                <br>
                x₃ = ${original.x[2].toFixed(6)}
            </div>

            <h4>Sistema modificado</h4>

            <p>
                Se cambia únicamente:
            </p>

            <div class="formula">
                6.002 → 6.003
            </div>

            <p>
                Se vuelve a resolver utilizando la misma matriz A.
            </p>

            <div class="formula">
                x₁ = ${modificado.x[0].toFixed(6)}
                <br>
                x₂ = ${modificado.x[1].toFixed(6)}
                <br>
                x₃ = ${modificado.x[2].toFixed(6)}
            </div>

        </div>

        <div class="conclusion">

            <h3>Conclusión del caso mal condicionado</h3>

            <p>
                Un pequeño cambio en uno de los datos de entrada puede
                provocar una variación significativa en la solución.
                Esto demuestra que un sistema mal condicionado es
                sensible a errores de medición, redondeo o pequeñas
                modificaciones de los datos financieros.
            </p>

            <p>
                Por esta razón, en problemas financieros es importante
                trabajar con datos suficientemente precisos y analizar
                la estabilidad de los resultados.
            </p>

        </div>
    `;

    document.getElementById("resultadoMal").innerHTML = html;
}


/* ========================================================= */
/* MOSTRAR MATRIZ COMO TEXTO */
/* ========================================================= */

function matrizTexto(M) {

    let texto = "";

    for (let i = 0; i < M.length; i++) {

        texto += "[ ";

        for (let j = 0; j < M[i].length; j++) {

            texto += M[i][j].toFixed(6);

            if (j < M[i].length - 1) {
                texto += "   ";
            }
        }

        texto += " ]";

        if (i < M.length - 1) {
            texto += "<br>";
        }
    }

    return texto;
}


/* ========================================================= */
/* CONCLUSION GENERAL */
/* ========================================================= */

function mostrarConclusion() {

    let html = `

        <div class="conclusion">

            <h3>Conclusión general</h3>

            <p>
                El cálculo de errores permite conocer qué tan alejados
                están los datos aproximados de los valores reales y
                evaluar su posible impacto financiero.
            </p>

            <p>
                La aproximación de Taylor permite estimar valores
                financieros utilizando información conocida alrededor
                de un punto determinado.
            </p>

            <p>
                Los métodos para sistemas de ecuaciones permiten
                determinar una distribución de recursos que satisfaga
                las restricciones planteadas.
            </p>

            <p>
                Finalmente, el caso mal condicionado demuestra que
                pequeños cambios en los datos pueden producir grandes
                variaciones en los resultados, por lo que la precisión
                de los datos es importante para tomar decisiones
                financieras confiables.
            </p>

        </div>
    `;

    document.getElementById("conclusionGeneral").innerHTML = html;
}


/* ========================================================= */
/* INICIO */
/* ========================================================= */

window.onload = function() {

    /*
       Al abrir la página se muestra por defecto
       el caso ideal.
    */

    cambiarCaso();
};