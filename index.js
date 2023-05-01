let nombreArtista = document.getElementById("nombreArtista");
let nombreAlbum = document.getElementById("nombreAlbum");
let fotoArtista = document.getElementById("fotoArtista");
let fotoAlbum = document.getElementById("fotoAlbum");
let listaCanciones = document.getElementById("listaCanciones");

const searchArtist = () => {
  const artistId = document.getElementById("artist-id").value;
  const url = `https://spotify23.p.rapidapi.com/artists/?ids=${artistId}`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "af4913a6eemshad72e92cf605f20p12cefdjsn8ecc0dc062fa",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      //.releases.items[0].name
      console.log(response);
      nombreArtista.innerHTML = response.artists[0].name;
      fotoArtista.src = response.artists[0].images[0].url;
    })
    .catch((err) => console.error(err));
};

const searchAlbum = () => {
  const artistId = document.getElementById("artist-id").value;
  const url = `https://spotify23.p.rapidapi.com/artist_albums/?id=${artistId}&offset=0&limit=100`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "af4913a6eemshad72e92cf605f20p12cefdjsn8ecc0dc062fa",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      nombreAlbum.innerHTML =
        response.data.artist.discography.albums.items[0].releases.items[0].name;
      fotoAlbum.src =
        response.data.artist.discography.albums.items[0].releases.items[0].coverArt.sources[0].url;
      const idAlbum =
        response.data.artist.discography.albums.items[0].releases.items[0].id;
      const url = `https://spotify23.p.rapidapi.com/albums/?ids=${idAlbum}`;

      const options = {
        method: "GET",
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key":
            "af4913a6eemshad72e92cf605f20p12cefdjsn8ecc0dc062fa",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };
      fetch(url, options)
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
    
        let canciones = respuesta.albums[0].tracks.items;
        
        let todasLasCanciones = '';
        canciones.forEach((cancion,index)=>{
            let nombreCancion = cancion.name;
            let cancionUrl = cancion.preview_url;
            todasLasCanciones += `
            <div class="col-12 col-md-4 text-center">
                <p>${nombreCancion}</p>
                <audio controls>
                    <source src="${cancionUrl}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>`;
            console.log(nombreCancion);
            console.log(cancion.preview_url);
        });
        listaCanciones.innerHTML = todasLasCanciones;
        })
        .catch((err) => console.error(err));
    });
};