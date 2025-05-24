const cards = {
  verde: [
    "Culo", "Chota", "Tetilla", "Lengua", "Nuca", "Axila sudada", "Pezón duro", "Panza cervecera", "Sillón de la abuela",
    "Baño de boliche", "Rincón oscuro", "Cama cucheta", "Heladera vacía", "Consolador rosa", "Plug anal", "Látigo con peluchito",
    "Lubricante sabor frutilla", "Antifaz erótico", "Esposas peludas", "Camisón transparente", "Bañera compartida",
    "Ascensor atascado", "Auto con vidrios empañados", "Bidet", "Paleta de castigo", "Cepillo de dientes prestado",
    "Vibrador silencioso", "Ropa interior olvidada", "Lencería de encaje", "Cajón prohibido", "Teléfono desbloqueado",
    "Sábanas pegajosas", "Mueble que cruje", "Alfombra peluda", "Caja de condones", "Control remoto perdido",
    "Paraguas mojado", "Silla del comedor", "Ducha sin cortina", "Mesada de la cocina", "Balcón del edificio",
    "Pileta hinchable", "Disfraz de conejita", "Cuerpo sudado", "Rodilla raspada", "Espalda arqueada", "Pie con media",
    "Lengua traviesa", "Muñeco inflable", "Puff pegajoso"
  ],
  rojo: [
    "El Dibu", "Maradona", "Ricardo Fort", "Mirtha Legrand", "Wanda Nara", "Milei", "Cristina", "Político chorro",
    "Influencer hot", "Sugar daddy", "Sugar mommy", "Ex tóxico", "Profesor fachero", "Masajista sensual", "El gritón del bondi",
    "Vecino musculoso", "Tiktoker insoportable", "Roomie intenso", "Abuela fiestera", "Mozo olvidadizo", "Ex famoso",
    "Novio celoso", "Psicóloga hot", "Mamá con datos", "Rugbier básico", "Fan de Marvel", "Vendedor ambulante",
    "Abogado canchero", "El del gimnasio", "Novia controladora", "Estudiante eterno", "Borracho del boliche", "Conejita Playboy",
    "Influencer espiritual", "Modelo de OnlyFans", "Amiga intensa", "El del grupo", "El que manda memes", "Trapero fumado",
    "Chanta simpático", "Fan de Shakira", "Repartidor fachero", "La vecina chusma", "Hermana metida", "Amigo gay",
    "El de los audios", "Fan de astrología", "Hincha de Boca", "El que stalkea", "El que manda nudes"
  ],
  amarillo: [
    "Pedo silencioso", "Calambre en pleno acto", "Ex aparece en cita", "Se rompe el forro", "Audio hot por error",
    "Llamada de la suegra", "Micrófono abierto", "Entrar desnudo al Zoom", "Grito en el telo", "Gemido en reunión",
    "Historia hot en grupo", "Chapar a tu primo", "Nombre equivocado en cama", "Mascota entra al cuarto",
    "Te leen el historial", "Ropa interior rota", "Se corta la luz", "Lubricante con picante", "Te llaman papá",
    "Vomitar en la cita", "Confundir gemido con bostezo", "Foto hot en estados", "Se cae la cama", "Telo sin habitaciones",
    "Ex en la fiesta", "Olvidás el forro", "Delivery interrumpe el acto", "Te agarran en bolas", "Camiseta manchada",
    "Video viral bochornoso", "Toalla que se cae", "Cita con mal aliento", "Te ven por la ventana", "Sábanas mojadas",
    "Doble match con hermanas", "Suegra escucha gemidos", "Condón en la cartera", "Olvidás depilarte", "Bar sin alcohol",
    "Morder sin querer", "Cita con tu ex", "Audio largo en misa", "Zoom sin pantalones", "Te llama tu mamá",
    "Quedás en visto", "Te rechazan el beso", "Flatulencia en ascensor", "Video hot compartido",
    "Camisón en reunión", "Boca seca en cita"
  ],
  azul: [
    "Bailar reggaetón", "Mandar nudes", "Cucharear fuerte", "Dormir con ronquidos", "Escribir borracho",
    "Subir historia hot", "Toser sin disimulo", "Roncar en la cita", "Hacer cucharita", "Pegar una nalgada",
    "Tirarse un pedo", "Chapar en público", "Bailar en calzones", "Llorar en el bondi", "Masticar con ruido",
    "Leer chats ajenos", "Gritar en el telo", "Reírse con delay", "Compartir un nude", "Contar un secreto",
    "Comer con la mano", "Enviar un audio hot", "Espiar historias", "Hacer striptease", "Tocar sin querer",
    "Oler la axila", "Twerkear sin ritmo", "Hacer yoga desnudo", "Bailar sin pantalón", "Jugar con hielo",
    "Roncar con intensidad", "Boca abierta al comer", "Tocar timbre y correr", "Despertar empapado",
    "Vomitar en el baño", "Saludar al ex", "Ligar en el subte", "Piropear mal", "Lamer un helado",
    "Hacer un brindis", "Tirar indirectas", "Decir te amo rápido", "Llamar sin querer", "Mandar ubicación errónea",
    "Dormirse en reunión", "Escribir poesía hot", "Jugar al truco", "Bailar sobre la mesa",
    "Comer picante sin agua", "Cantar en la ducha"
  ],
  naranja: [
    "Frula de cumpleaños", "Asado sin carne", "Mate con yuyos raros", "Sexo en vacaciones", "Fiesta clandestina",
    "Pijama manchado", "Video viral vergonzoso", "Maratón de Netflix", "Cena con ex", "Chisme en el grupo",
    "Tuit cancelado", "Galletita húmeda", "Noche sin recuerdos", "Selfie en el baño", "Telo sin aire",
    "Playlist hot", "Posteo cringe", "Amigo que desaparece", "Foto de pies", "Voz sexy en audio",
    "Ex que vuelve", "Cita de Tinder", "Cumbia a todo volumen", "Sexting sin respuesta", "Porno casero",
    "Sexo con medias", "Camisón heredado", "Fiesta con desconocidos", "Llamado a las 3am", "Foto sin filtro",
    "Ex en el casamiento", "Zapato roto", "Sexo en el auto", "Bailar arriba de la mesa", "Ropa interior olvidada",
    "Desayuno con resaca", "Meme de Shrek", "Pan mojado", "Amor de verano", "Historia vieja resucitada",
    "Hincha fanático", "Llamada de tu mamá", "Falsa alarma de embarazo", "Foto grupal editada", "Canción que delata",
    "Sueño profundo", "Amiga intensa", "Noche de pasión", "Nudes pixelados", "Grito en el telo"
  ]
};
