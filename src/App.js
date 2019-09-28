import React, { useState, useEffect } from 'react';
import Buscador from './components/Buscador';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
	const [ busqueda, guardarBusqueda ] = useState('');
	const [ imagenes, guardarImagenes ] = useState([]);

	const [ paginaActual, guardarPaginaActual ] = useState(1);
	const [ totalPaginas, guardarTotalPaginas ] = useState(1);

	useEffect(
		() => {
			const consultarApi = async () => {
				if (busqueda === '') return;

				const imagenesPorPagina = 30;
				const key = '12035238-2855fdec7bb86102cc8c1b80b';

				const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

				const respuesta = await fetch(url);
				const resultado = await respuesta.json();

				guardarImagenes(resultado.hits);

				// Calcular el total de paginas

				const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
				guardarTotalPaginas(calcularTotalPaginas);
			};
			consultarApi();
		},
		[ busqueda ]
	);

	const paginaAnterior = () => {
		let nuevaPaginaActual = paginaActual - 1;

		// colocarlo en el state
		guardarPaginaActual(nuevaPaginaActual);
	};

	const paginaSiguiente = () => {
		let nuevaPaginaActual = paginaActual + 1;

		// colocamos en el state
		guardarPaginaActual(nuevaPaginaActual);
	};
	return (
		<div className="app container">
			<div className="jumbotron">
				<p className="lead text-center">Buscador de Imágenes</p>

				<Buscador guardarBusqueda={guardarBusqueda} />
			</div>
			<div className="row justify-content-center">
				<ListadoImagenes imagenes={imagenes} />

				{paginaActual === 1 ? null : (
					<button onClick={paginaAnterior} type="button" className="btn btn-info mr-1">
						Anterior &laquo;
					</button>
				)}

				{paginaActual === totalPaginas ? null : (
					<button onClick={paginaSiguiente} type="button" className="btn btn-info">
						Siguiente &raquo;
					</button>
				)}
			</div>
		</div>
	);
}

export default App;
