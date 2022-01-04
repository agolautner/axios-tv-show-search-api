async function loadEvent() {
    const form = document.getElementById('searchForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const searchTerm = form.elements.query.value;
        //this one is not strictly necessary, but if we were to need more search parameters, it would come in useful. Last two params will be added to the query string as well, although the api will ignore them
        const config = { params: { q: searchTerm, isRecommended: true, things: 'stuff'}};
        const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
        makeImages(res.data);
    })

    const makeImages = (shows) => {
        for (let result of shows) {
            if (result.show.image) {
                const img = document.createElement('IMG');
                img.src = result.show.image.medium;
                document.body.append(img);
            }
        }
    }
}

window.addEventListener('load', loadEvent);