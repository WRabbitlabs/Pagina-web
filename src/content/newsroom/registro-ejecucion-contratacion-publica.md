---
title: 'Registro de ejecución verificable en procesos de contratación pública'
category: 'Publicación'
date: 2026-08-06
featured: true
excerpt: 'Publicamos el modelo de registro que usamos para reconstruir, paso por paso, cualquier ejecución automatizada dentro de un proceso de contratación. Incluye el esquema de eventos y el procedimiento de verificación ante un ente de control.'
image: '../../assets/newsroom-registro.png'
imageAlt: 'Dos columnas de legajos apilados, con pestañas escritas a mano que marcan el año de cada expediente.'
---

Un proceso automatizado que no puede explicarse después no es un proceso automatizado: es una caja negra con permisos de escritura. En contratación pública esa distinción deja de ser filosófica en el momento en que llega un requerimiento.

Este documento describe el modelo de registro que aplicamos en toda ejecución: qué se captura, cuándo, con qué nivel de detalle, y cómo se reconstruye una corrida completa a partir de sus eventos.

## Qué se registra

Cada paso emite un evento con cuatro campos obligatorios: el insumo recibido, la regla que se evaluó, el resultado y la marca temporal con precisión de milisegundo. Ningún paso puede ejecutarse sin declarar previamente su regla.

## Cómo se verifica

La verificación no depende de nuestra infraestructura. El registro se exporta como un archivo autocontenido que un tercero puede validar sin acceso a los sistemas de la entidad.
