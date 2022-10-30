const characterStatusMap = new Map();
  characterStatusMap.set("all", "all");
  characterStatusMap.set("alive", "Alive");
  characterStatusMap.set("dead", "Dead");
  characterStatusMap.set("unknown", "unknown");

const getCharactersUrl = (nextPageUrl: string | null, name?: string, status?: string) => {
    let requestUrl = new URL('https://rickandmortyapi.com/api/character');
  
    requestUrl = new URL(nextPageUrl ? nextPageUrl : requestUrl.href);
  
    if(name !== undefined) {
      requestUrl.searchParams.append("name", name);
    }
  
    if(status !== undefined && status !== characterStatusMap.get("all")) {
      requestUrl.searchParams.append("status", status);
    }
  
    return requestUrl.href;
};

const getCharacterDetails = (id: string) => {
    return `https://rickandmortyapi.com/api/character/${id}`;
}

const getEpisodesListUrl = (episodesUrl: string[]) => {
    // console.log(episodesUrl);
    const idExtractorRegexp = /episode\/(\d+)/im;
    const episodesIds = episodesUrl.map((url: string) => {
        // console.log(url);
        const capturedId = idExtractorRegexp.exec(url) as RegExpExecArray;
        // console.log({capturedId, url, episodesUrl});
        // console.log([...capturedId.values()]);
        return capturedId["1"];

    }).filter(id => id !== null);

    // console.log(`https://rickandmortyapi.com/api/episode/${episodesIds.join(',')}`);
    return `https://rickandmortyapi.com/api/episode/${episodesIds.join(',')}`;
}

export {characterStatusMap, getCharactersUrl, getCharacterDetails, getEpisodesListUrl };