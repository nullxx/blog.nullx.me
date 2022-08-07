---
layout: "../../layouts/BlogPost.astro"
title: "M++ simulator"
description: "Simulador hecho desde cero partiendo del diseño teórico de 'La Maquina plus plus'"
publishDate: "2022-06-06"
tags: [spanish, m++, simulator]
image:
  src: "https://mpp.nullx.me/static/media/icon.826c02d40cfe921562c5.png"
  alt: "CPU"
setup: |
  import GithubLink from "../../components/md/GithubLink.astro"
---

<GithubLink url="https://github.com/nullxx/mpp" name="Open source"/>

## Introduction

Se trata de un simple, rapido, y potente simulador para la [M++](https://web.archive.org/web/20170518104216/http://paginaspersonales.deusto.es/zubia/)

Esta máquina (M++) se estudia en la asignatura _Estructura de Computadores_ en ingeniería informática de la [Universidad de Deusto](https://www.deusto.es/).
En ella se aprenden conceptos básicos fundamentos y estructura de computadores.

En la parte de prácticas se utliza la M++ para resolver diferentes problemas con el objetivo de aprender a microprogramar.

## Motivaciones

Actualmente existen dos simuladores para la M++, uno construido en [Java](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)) y otro en [C++](https://es.wikipedia.org/wiki/C%2B%2B). Tanto el primero como el segundo, bajo mi punto de vista, tienen ciertos aspectos mejorables. Yo calificaría a ambos como versiones depreciadas.

<figure style="text-align:center">
<img src="https://i.ibb.co/4WnvcdY/mpp-c.png" alt="Simulador desarrollado en C++" />
<figcaption align="center">Figura 1. Simulador desarrollado en C++</figcaption>
</figure>

El simulador representado en la Figura 1, sólo estaba disponible para Windows, por lo que los alumnos con otros sistemas operativos, no podían utilizarlo de forma cómoda.

## Desarrollo

Es entonces cuando comienzo a desarrollar un simulador en C, un lenguaje de propósito general de medio/bajo nivel que se puede utilizar en todos los sistemas operativos por su independecia de hardware.

Mi máximo deseo era la programación de un simulador de la M++ lo más **fiel a la realidad**, es decir, tratar de simular cada uno de sus componentes hardware.

### Problemática

Para poder ser fiel a la realidad quería encapsular cada uno de los componentes, pudiendo estos realizar únicamente su funciónes principales y de comunicación.

Esto significaba que un componente no podía hacer llamadas a otros componentes.

#### **¿Cómo simulo la comunicación entre componentes?**

En la realidad esto se da gracias a los buses, pequeños cables que conectan los componentes, que se comunican por la presencia (`1`) o ausencia (`0`) de una señal eléctrica.

Es entonces cuando surge la idea del diseño [Publicación / Subscripción](https://cloud.google.com/pubsub/docs/overview?hl=es-419).

Esto permitiría que cada componente pudiera publicar un información en un "bus" (canal) y que cualquier otro componente pudiera subscribirse a dicho canal y recibir dicha información.

<figure style="text-align:center">
<img src="https://i.ibb.co/Kx7rzfL/pubSub.png" alt="Publicación / Subscripción" />
<figcaption align="center">Figura 2. Publicación / Subscripción</figcaption>
</figure>

El componente "Memoria" puede recibir información del bus de datos gracias a la subscripción al `TOPIC_1` mientras que también podría enviar información al bus de datos publicando en el `TOPIC_2`.

Cualquier componente puede subscribirse a n canales como publicar en n canales.

#### **Multiplataforma**

Uno de los aspectos más importantes es la compatibilidad con todos los sistemas operativos.

La interfaz visual fue lo más problematico para programarlo en C. Aunque hay varias librerías que hacen esto posible, fue una tarea difícil y tediosa que no producía el resultado deseado.

Quería un diseño fácil de utilizar y sobretodo amigable y bonito.

Cuando un usuario utiliza tu programa cómo una herramienta para realizar algo, lo más que puede hacer el desarrollador es facilitarselo a través de una interfaz accesible.

También traté de hacer la interfaz gráfica en Java, pero tampoco me convencía.

Entonces es cuando compienzo el desarrollo de la interfaz gráfica en la web, a través de [React](https://reactjs.org/).

Pero, si el núcleo está desarrollado en C, ¿cómo puedo utilizarlo en la web?. Tradicionalmente no se podía "importar" ficheros binarios (compilados de c) en la web. Desde 2015, esto es posible gracias a [WebAssembly](https://en.wikipedia.org/wiki/WebAssembly), un formato de código binario portable que se ejecuta en el lado del cliente (portable).

¿Para qué desarrollar un programa en cada plataforma, si se puede crear una web accesible desde todos los sistemas operativos?

## Resultado

<figure style="text-align:center">
<img src="https://github.com/nullxx/mpp/blob/master/demo/demo_welcome.png?raw=true" alt="Pagina de bienvenida" />
<figcaption align="center">Figura 3. Pagina de bienvenida</figcaption>
</figure>
<hr />
<figure style="text-align:center">
<img src="https://github.com/nullxx/mpp/blob/master/demo/demo_board.png?raw=true" alt="Página principal" />
<figcaption align="center">Figura 4. Página principal</figcaption>
</figure>
<hr />
<figure style="text-align:center">
<img src="https://github.com/nullxx/mpp/blob/master/demo/demo_coder.png?raw=true" alt="Página del programador" />
<figcaption align="center">Figura 5. Página del programador</figcaption>
</figure>
<hr />
<figure style="text-align:center">
<img src="https://github.com/nullxx/mpp/blob/master/demo/demo_info.png?raw=true" alt="Página de información" />
<figcaption align="center">Figura 6. Página de información</figcaption>
</figure>
<hr />
<figure style="text-align:center">
<img src="https://nullx.me/images/mpp.gif" alt="Simulador M++ en acción" />
<figcaption align="center">Figura 7. Simulador M++ en acción</figcaption>
</figure>
