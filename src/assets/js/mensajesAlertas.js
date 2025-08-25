import Swal from 'sweetalert2'

// Clase para manejar mensajes de alerta de eliminar proyecto por una clase y una funcion.
class MensajesAlertas {
    async confirmarEliminacion(onConfirm) {
        const result = await Swal.fire({
            title: '¿Estás seguro de eliminar este proyecto?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
        });
        if (result.isConfirmed) {
            await onConfirm();
            Swal.fire(
                'Eliminado',
                'El proyecto ha sido eliminado.',
                'success'
            );
        }
    }

}
export default MensajesAlertas;