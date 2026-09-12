---
title: 'Validación previa de un informe XBRL antes de enviarlo a Supersociedades'
category: 'Publicación'
date: 2026-07-09
excerpt: 'Cómo comprobamos un informe financiero en XBRL contra la taxonomía oficial de la Superintendencia de Sociedades antes del envío: fórmulas de la propia taxonomía, sumas a la precisión declarada y hechos duplicados, con el registro de cada comprobación.'
---

La Superintendencia de Sociedades recibe los estados financieros de fin de ejercicio en XBRL, contra una taxonomía pública que trae sus propias reglas. Un informe que no las cumple se devuelve; uno que las cumple a medias se acepta y deja un problema para el ejercicio siguiente.

Este artículo describe qué comprobamos antes del envío y cómo queda constancia de cada comprobación.

## Qué se comprueba

Tres cosas, en este orden: que cada hecho apunte a un concepto de la taxonomía vigente para el corte del informe; que las sumas cuadren a la precisión que el propio informe declara; y que ningún hecho se repita con valores distintos. Las fórmulas se toman de la taxonomía, no se reescriben.

## Qué queda registrado

Cada regla evaluada emite un evento con la regla, el resultado y la marca temporal. El validador de referencia es Arelle, y el registro de esa misma corrida acompaña al informe.
