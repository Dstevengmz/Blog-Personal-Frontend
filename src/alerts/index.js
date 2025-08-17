import Swal from 'sweetalert2';

export function alertLoginSuccess(user) {
  const nombre = user?.nombre || user?.email || '';
  return Swal.fire({
    icon: 'success',
    title: nombre ? `¡Bienvenido, ${nombre}!` : '¡Bienvenido! ',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
  });
}

export function alertProyectoCreado() {
  return Swal.fire({
    icon: 'success',
    title: 'Proyecto creado',
    text: 'Se registró correctamente.',
    showConfirmButton: false,
    timer: 1600,
  });
}

export function confirmComentar() {
  return Swal.fire({
    icon: 'question',
    title: '¿Publicar comentario?',
    text: 'Confirma para enviar tu comentario.',
    showCancelButton: true,
    confirmButtonText: 'Sí, publicar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    focusCancel: true,
  }).then((r) => r.isConfirmed);
}

export function alertComentarioPublicado() {
  return Swal.fire({
    icon: 'success',
    title: 'Comentario publicado',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
  });
}

export function alertError(message) {
  return Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message || 'Algo salió mal.',
  });
}

export default {
  alertLoginSuccess,
  alertProyectoCreado,
  confirmComentar,
  alertComentarioPublicado,
  alertError,
};
