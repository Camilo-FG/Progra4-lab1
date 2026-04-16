export interface Opcion {
  descripcion: string;
  correcto: boolean;
}

export interface Pregunta {
  id_pregunta: number;
  pregunta: string;
  descripcion_pregunta: string;
  opciones: Opcion[];
  explicacion: string;
}

export interface PreguntasResponse {
  preguntas: Pregunta[];
}

import React from 'react'


