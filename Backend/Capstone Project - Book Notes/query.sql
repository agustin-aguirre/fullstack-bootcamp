CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT,
    genre TEXT,
    author TEXT,
    review TEXT
);

INSERT INTO books (title, genre, author, review) VALUES
('El Último Hijo del Viento', 'Fantasía épica', 'Ismael Cortázar', 'Una historia profundamente envolvente sobre un joven con el poder de comunicarse con los vientos antiguos. La novela combina mitología original, personajes entrañables y una narrativa visual que recuerda a los grandes clásicos de la fantasía. Perfecto para fans de Ursula K. Le Guin y Brandon Sanderson.'),
('Crónicas del Metro de las 3 AM', 'Thriller urbano', 'Lucía Renzi', 'Una serie de desapariciones en el subte de Buenos Aires a las 3 de la mañana dispara una investigación llena de tensión, paranoia y secretos del pasado. Ágil, oscura y atrapante. Una historia que te deja mirando de reojo la próxima vez que bajes al andén.'),
('Cosecha de Cristal', 'Ciencia ficción distópica', 'J. N. Hallberg', 'En un futuro donde los recuerdos se cultivan y comercializan, una recolectora descubre una conspiración que podría alterar la conciencia humana. Innovadora, inquietante y emocionalmente potente. Ciencia ficción con alma.'),
('Donde Se Oxidan Las Aves', 'Realismo mágico', 'Elena Fariña', 'Una aldea remota donde los pájaros olvidan volar y el tiempo se encierra en botellas. Fariña construye un mundo lírico y extraño, donde lo poético se cruza con lo trágico. Una joya para los amantes de García Márquez o Samanta Schweblin.'),
('El Error de los Dioses', 'Aventura mitológica', 'Matías Rocha', 'Cuando los dioses cometen un error y mezclan los destinos de dos mortales, el mundo se tambalea. Mitología reinventada con acción trepidante y una pizca de comedia. Ideal para quienes buscan aventura con sustancia.'),
('La Casa Que Suda Agua', 'Terror psicológico', 'Cecilia Valenti', 'Una joven se muda a una casa rural donde las paredes literalmente lloran. Lo que empieza como una rareza se transforma en un descenso agobiante a la locura y el trauma no resuelto. Asfixiante y magistral.'),
('Archipiélago de Sombras', 'Novela negra contemporánea', 'Diego Lavalle', 'Un detective retirado es llamado para resolver un caso en un complejo turístico donde nadie parece ser quien dice ser. Escritura sobria, personajes ambiguos y una atmósfera tensa que atrapa hasta la última página.'),
('El Jardín Que Solo Florece en Otoño', 'Drama contemporáneo', 'Nora Vicentini', 'La historia de una mujer que regresa a la casa de su infancia para enfrentar los secretos enterrados tras la muerte de su madre. Un libro sensible, introspectivo y lleno de humanidad. Doloroso, pero curativo.'),
('Cadencia', 'Novela romántica con música clásica', 'Ariel Costas', 'Una violinista y un joven pianista se encuentran en un conservatorio en Viena. La música que comparten se convierte en un puente entre sus heridas. Emotiva, elegante y con un ritmo perfectamente orquestado.'),
('Planeta Hueco', 'Aventura juvenil/space opera', 'Violeta Kuznetsova', 'Un grupo de adolescentes descubre un planeta aparentemente inhabitable que en realidad es hueco… y habitado por algo que no quiere ser encontrado. Ideal para jóvenes lectores que aman la ciencia ficción con un toque de misterio y acción.');
