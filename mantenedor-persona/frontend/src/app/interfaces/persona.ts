export interface Persona {
    id: string;
    nombre: string;
    apellido: string;
    rut: string;
    sexo: string;
    telefono: string;
    direccion: string;
    fechaNacimiento: Date;
    email: string;
  }

function formatDate(date: Date): string {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}