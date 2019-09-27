import React, { useState } from 'react';

function Buscador() {
	const [ terminoBusqueda, guardarTerminoBusqueda ] = useState('');
	const [ error, guardarError ] = useState(false);

	const buscarImagen = (e) => {
		e.preventDefault();

		// Validar

		if (terminoBusqueda === '') {
			guardarError(true);
			return;
		}
		// Enviar el termino hacia el componente principal
		guardarError(false);
	};
	return (
		<form onSubmit={buscarImagen}>
			<div className="row">
				<div className="form-group col-md-8">
					<input
						type="text"
						className="form-control form-control-lg"
						placeholder="Busca una imagen, ejemplo: Futbol o Café"
						onChange={(e) => guardarTerminoBusqueda(e.target.value)}
					/>
				</div>

				<div className="form-group col-md-4">
					<input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar" />
				</div>
			</div>
		</form>
	);
}
export default Buscador;
