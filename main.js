
const showList = document.querySelector('.search-result ');

// Search button function
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function(){
    const searchBox = document.getElementById('search-box');
    const searchValue = searchBox.value;
    if(!searchValue){
        alert('please write song name')
    }else{
        searchSong(searchValue);
    }
    
})

// API key search
function searchSong(searchValue){
    fetch(`https://api.lyrics.ovh/suggest/${searchValue}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        showData(data)
    })
}

// Display data show function
function showData(data){

    let limitData = data.data.slice(0,10);
    showList.innerHTML =`
        
    ${limitData.map(song => `
    <div class="single-result row align-items-center my-3 p-3">
    <div class="col-md-3">
    <img src="${song.album.cover_small}" >
    </div>
    <div class="col-md-6 text-center">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.album.title}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button data-artist="${song.artist.name}" data-song="${song.title}" class="btn btn-success">Get Lyrics</button>
    </div>
    </div>
    `).join('')
}
    `
}

// get lyrics button function
showList.addEventListener('click',ami=>{
    const clickElement = ami.target;
    if(clickElement.tagName === 'BUTTON'){
        const artist = clickElement.getAttribute('data-artist');
        const songName = clickElement.getAttribute('data-song');

        getLyrics(artist,songName);
    }
})

// Lyrics show function
async function getLyrics(artist,songName){
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songName}`)
    const data = await res.json();

    const lyrics = data.lyrics.replace(/\n/, '<br />');

    const lyricsShow = document.querySelector('.single-lyrics');
    lyricsShow.innerHTML = `
     <button class="btn go-back">&lsaquo;</button>
     <h2 class="text-success mb-4">${artist} -${songName}</h2>
     <pre class="lyric text-white">
         ${lyrics}
     </pre>
    `
}